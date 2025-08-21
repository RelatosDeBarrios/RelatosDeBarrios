import { NextResponse } from 'next/server'
import { rateLimit, secureHash } from '../../lib/redis'
import { createUploadProof, createCorrelationId } from '../../lib/crypto'

// Rate limit configuration
const RATE_LIMIT = Number(process.env.HUB_RATE_LIMIT || 5) // Max uploads per IP per window
const WINDOW_SECONDS = Number(process.env.HUB_WINDOW_SECONDS || 24 * 60 * 60) // 24 hours
const PROOF_COOKIE_NAME = process.env.HUB_PROOF_COOKIE || 'hub_upload_proof'

export async function POST(request: Request): Promise<
  NextResponse<{
    allowed: boolean
    remaining: number
    retryAfter?: number
    error?: string
  }>
> {
  // Extract correlation ID for request tracing or create a new one
  const correlationId = await createCorrelationId(
    request.headers.get('x-correlation-id') || undefined
  )

  // Extract IP address with improved extraction handling
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (ip === 'unknown') {
    console.warn('Could not determine client IP address for rate limiting', {
      correlationId,
    })
    // Fail closed for unknown IPs
    return NextResponse.json(
      {
        error: 'Could not verify your identity',
        allowed: false,
        remaining: 0,
      },
      {
        status: 400,
        headers: {
          'X-Correlation-Id': correlationId,
        },
      }
    )
  }

  try {
    // Hash the IP for security before using it in the rate limit key
    const ipHash = await secureHash(ip)
    const key = `rate:ip:${ipHash}`

    // Use the centralized rate limit function
    const result = await rateLimit(
      key,
      RATE_LIMIT,
      WINDOW_SECONDS,
      'validate-ip',
      correlationId
    )

    if (!result.allowed) {
      return NextResponse.json(
        {
          error: result.error || 'Rate limit exceeded',
          allowed: false,
          retryAfter: result.retryAfter,
          remaining: 0,
        },
        {
          status: 429,
          headers: {
            'X-Correlation-Id': correlationId,
          },
        }
      )
    }

    // Create a proof token for the blob upload endpoint
    const token = await createUploadProof({
      ipHash,
      timestamp: Date.now(),
      nonce: crypto.randomUUID(),
      correlationId,
    })

    // Set the proof token as a secure HTTP-only cookie
    // This will be sent with the request to /api/blob-upload
    const response = NextResponse.json(
      {
        error: null as unknown as string | undefined, // Type hack to satisfy return type
        allowed: true,
        remaining: result.remaining,
      },
      {
        status: 200,
        headers: {
          'X-Correlation-Id': correlationId,
        },
      }
    )

    // Set cookie on the response
    response.cookies.set({
      name: PROOF_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api', // Only send to API routes
      maxAge: 300, // 5 minute expiry (seconds)
    })

    return response

    // Response is already returned above
  } catch (error) {
    // Log the error and fail closed to prevent abuse
    console.error('Error during validate-ip:', error, { correlationId })

    return NextResponse.json(
      {
        error: 'Service unavailable',
        allowed: false,
        remaining: 0,
      },
      {
        status: 503,
        headers: {
          'X-Correlation-Id': correlationId,
        },
      }
    )
  }
}
