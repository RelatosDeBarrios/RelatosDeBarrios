import { NextResponse } from 'next/server'
import { createClient } from 'redis'

const redis = createClient({ url: process.env.REDIS_URL })
redis.connect()

// Ensure the Redis client is connected before handling requests
const RATE_LIMIT = 5 // Max uploads per IP per 24 hours
const WINDOW_SECONDS = 24 * 60 * 60 // 24 hours

export async function POST(request: Request): Promise<
  NextResponse<{
    allowed: boolean
    remaining: number
    retryAfter?: number
    error?: string
  }>
> {
  // Extract IP address (basic, can be improved for proxies)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (ip === 'unknown') {
    return new NextResponse(JSON.stringify({ error: 'IP address not found' }), {
      status: 400,
    })
  }

  const key = `rate:ip:${ip}`

  // Increment the counter for this IP
  const count = await redis.incr(key)

  // If this is the first upload, set the expiry window
  if (count === 1) {
    await redis.expire(key, WINDOW_SECONDS)
  }

  if (count > RATE_LIMIT) {
    // Log the blocked attempt
    const now = new Date().toISOString()
    await redis.lpush('log:rate-limit-hits', `${ip}|${now}`)
    await redis.ltrim('log:rate-limit-hits', 0, 999) // Keep last 1000 entries

    // Get TTL to inform user how long to wait
    const ttl = await redis.ttl(key)
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        allowed: false,
        retryAfter: ttl,
        remaining: 0,
      }),
      { status: 429 }
    )
  }

  // Allow the request
  return new NextResponse(
    JSON.stringify({
      error: null,
      allowed: true,
      remaining: RATE_LIMIT - count,
    }),
    { status: 200 }
  )
}
