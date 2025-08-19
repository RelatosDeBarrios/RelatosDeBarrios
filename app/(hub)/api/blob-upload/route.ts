import { cookies } from 'next/headers'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { CONTACT } from '@/app/(hub)/sections/contact/content'
import { secureHash, rateLimit } from '../../lib/redis'
import { verifyUploadProof, createCorrelationId } from '../../lib/crypto'

// Configuration constants
const PROOF_COOKIE_NAME = 'hub_upload_proof'
const ALLOWED_ORIGINS = (
  process.env.HUB_ALLOWED_ORIGINS ||
  'http://localhost:3000,https://relatosdebarrios.cl,https://www.relatosdebarrios.cl'
)
  .split(',')
  .map((o) => o.trim())
const TOKEN_EXPIRY_SECS = Number(process.env.HUB_BLOB_TOKEN_EXPIRY || 180) // 3 minutes token validity

export async function POST(request: Request): Promise<NextResponse> {
  // Extract or create correlation ID
  const correlationId = createCorrelationId(
    request.headers.get('x-correlation-id') || undefined
  )

  try {
    // Verify same-origin to prevent cross-origin requests
    const origin = request.headers.get('origin')

    // Enforce https in production and allowlist origin
    const isHttpsOk =
      process.env.NODE_ENV !== 'production' ||
      (origin?.startsWith('https://') ?? false)

    // Only allow requests from our own origin
    if (!origin || !ALLOWED_ORIGINS.includes(origin) || !isHttpsOk) {
      console.error(
        `Blocked upload request from unauthorized origin: ${origin || 'unknown'}`,
        { correlationId }
      )
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        {
          status: 403,
          headers: {
            'X-Correlation-Id': await correlationId,
          },
        }
      )
    }

    // Extract IP for rate limiting and verification
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (ip === 'unknown') {
      console.error(
        'Could not determine client IP for blob upload authorization',
        { correlationId }
      )
      return NextResponse.json(
        { error: 'Could not verify client' },
        {
          status: 400,
          headers: {
            'X-Correlation-Id': await correlationId,
          },
        }
      )
    }

    // Hash the IP for security and verification against the proof token
    const ipHash = await secureHash(ip)

    // Verify upload proof from cookie (set by validate-ip endpoint)
    const cookieStore = await cookies()
    const proofCookie = cookieStore.get(PROOF_COOKIE_NAME)

    if (!proofCookie?.value) {
      console.error('Missing upload proof cookie', {
        correlationId,
        ipHash: ipHash.slice(0, 8),
      })
      return NextResponse.json(
        { error: 'Validation required before upload' },
        {
          status: 403,
          headers: {
            'X-Correlation-Id': await correlationId,
          },
        }
      )
    }

    // Verify the JWT token from the cookie
    const proof = await verifyUploadProof(proofCookie.value)

    if (!proof) {
      console.error('Invalid upload proof token', { correlationId })
      return NextResponse.json(
        { error: 'Invalid upload authorization' },
        {
          status: 403,
          headers: {
            'X-Correlation-Id': await correlationId,
          },
        }
      )
    }

    // Verify IP hash matches the one in the token
    if (proof.ipHash !== ipHash) {
      console.error('IP mismatch in upload proof', {
        correlationId,
        tokenIpHashPrefix: proof.ipHash?.slice(0, 8),
        currentIpHashPrefix: ipHash.slice(0, 8),
      })
      return NextResponse.json(
        { error: 'Client validation failed' },
        {
          status: 403,
          headers: {
            'X-Correlation-Id': await correlationId,
          },
        }
      )
    }

    // Ensure the proof is recent (check timestamp is within 5 minutes)
    const tokenAge = Date.now() - (proof.timestamp || 0)
    if (tokenAge > 5 * 60 * 1000) {
      console.error('Upload proof expired', {
        correlationId,
        tokenAgeMs: tokenAge,
      })
      return NextResponse.json(
        { error: 'Validation expired, please refresh' },
        {
          status: 403,
          headers: {
            'X-Correlation-Id': await correlationId,
          },
        }
      )
    }

    // Parse the request body for Vercel Blob handler
    const body = (await request.json()) as HandleUploadBody

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Recheck rate limit to ensure the client is still within limits
        const rateLimitKey = `rate:ip:${ipHash}`
        const rateLimitCheck = await rateLimit(
          rateLimitKey,
          Number(process.env.HUB_RATE_LIMIT || 5),
          24 * 60 * 60, // Match WINDOW_SECONDS from validate-ip
          'blob-token',
          await correlationId
        )

        if (!rateLimitCheck.allowed) {
          throw new Error('Rate limit exceeded for uploads')
        }

        // Return configuration for the upload
        return {
          // Accept types should match what we define in CONTACT.form.attachments.accept
          allowedContentTypes: [
            'image/*',
            'video/*',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ],
          // Generate unique filenames to avoid collisions
          addRandomSuffix: true,
          // Maximum allowed size
          maximumSizeInBytes: CONTACT.form.attachments.maxSize * 1024 * 1024,
          // Enable multipart uploads for better reliability with larger files
          multipart: true,
          // Set a short token lifespan to prevent abuse
          expiresIn: TOKEN_EXPIRY_SECS,
          // Include metadata about the upload that we can use for logging/auditing
          tokenPayload: JSON.stringify({
            timestamp: new Date().toISOString(),
            ipHash: ipHash.slice(0, 8), // Store only prefix for audit logs
            correlationId,
          }),
        }
      },
      onUploadCompleted: async (completedDetails) => {
        // Log completed uploads for audit/tracking
        const { blob, tokenPayload } = completedDetails
        const payload = tokenPayload ? JSON.parse(tokenPayload) : {}

        // Extract domain from blob URL to verify it's from our blob storage
        const blobUrl = new URL(blob.url)
        const isVercelBlob = blobUrl.hostname === 'blob.vercel-storage.com'

        console.log(
          `Blob upload completed: ${isVercelBlob ? blob.url : '[invalid-host]'}`,
          {
            correlationId: payload.correlationId || correlationId,
            ipHashPrefix: payload.ipHash || 'unknown',
            timestamp: payload.timestamp || new Date().toISOString(),
            size: blob.url?.length || 0,
          }
        )
      },
    })

    // Return success with correlation ID
    return NextResponse.json(jsonResponse, {
      headers: {
        'X-Correlation-Id': await correlationId,
      },
    })
  } catch (error) {
    console.error('Error handling upload:', error, { correlationId })
    return NextResponse.json(
      { error: (error as Error).message },
      {
        status: 400,
        headers: {
          'X-Correlation-Id': await correlationId,
        },
      }
    )
  }
}
