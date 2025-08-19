import { NextResponse } from 'next/server'
import { del, list } from '@vercel/blob'

// Security options
const INTERNAL_SECRET = process.env.INTERNAL_CLEANUP_SECRET
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://relatosdebarrios.cl',
  'https://www.relatosdebarrios.cl',
]

/**
 * API route for cleaning up all blobs - can be triggered by cron
 */
export async function GET(request: Request): Promise<NextResponse> {
  // Authentication check for the cron job
  const authHeader = request.headers.get('Authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`)
    // 401 Unauthorized
    return new NextResponse(null, { status: 401 })

  try {
    const { blobs } = await list()
    const blobsToDelete = blobs.map((b) => b.url)

    if (blobsToDelete.length === 0)
      return new NextResponse(null, { status: 204 })

    await del(blobsToDelete)

    // 204 No Content
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error cleaning up all blobs:', error)
    // 500 Internal Server Error
    return new NextResponse(null, { status: 500 })
  }
}

/**
 * API route for cleaning up specific uploaded blobs when email sending fails.
 *
 * Security:
 * - Only accepts same-origin requests
 * - Requires correct secret header
 * - Only accepts known blob URLs (from vercel-storage.com)
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Verify same-origin for security
    const origin = request.headers.get('origin')
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      )
    }

    // Verify internal secret for double security
    const authHeader = request.headers.get('x-internal-secret')
    if (
      !INTERNAL_SECRET ||
      INTERNAL_SECRET === 'change-me-in-production' ||
      authHeader !== INTERNAL_SECRET
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get blob URLs to delete
    const { urls, correlationId } = await request.json()

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        {
          error: 'No URLs provided',
          deleted: 0,
        },
        { status: 400 }
      )
    }

    // Track delete operations
    const deleteResults: { url: string; success: boolean }[] = []

    // Process each URL
    for (const url of urls) {
      try {
        // Verify URL is from our blob storage (basic validation)
        const parsedUrl = new URL(url)
        if (parsedUrl.hostname !== 'blob.vercel-storage.com') {
          deleteResults.push({ url, success: false })
          continue
        }

        // Delete the blob
        await del(url)
        deleteResults.push({ url, success: true })
      } catch (error) {
        console.error(`Error deleting blob at ${url}:`, error, {
          correlationId,
        })
        deleteResults.push({ url, success: false })
      }
    }

    // Count successful deletions
    const successCount = deleteResults.filter((r) => r.success).length

    return NextResponse.json({
      message: `Deleted ${successCount} of ${urls.length} blobs`,
      deleted: successCount,
      total: urls.length,
      details: deleteResults,
    })
  } catch (error) {
    console.error('Error in cleanup-blobs endpoint:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        deleted: 0,
      },
      { status: 500 }
    )
  }
}
