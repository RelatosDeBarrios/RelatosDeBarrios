import { NextResponse } from 'next/server'
import { del, list } from '@vercel/blob'

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
  } catch {
    // 500 Internal Server Error
    return new NextResponse(null, { status: 500 })
  }
}
