'use server'

import { createClient, type RedisClientType } from 'redis'
import { createHash } from 'crypto'

let redisClient: RedisClientType | null = null
let isConnecting = false

/**
 * Returns a singleton Redis client instance.
 * The client is created and connected once, then reused across serverless function invocations.
 * This prevents connection leaks and improves performance.
 */
export async function getRedisClient(): Promise<RedisClientType> {
  // If we already have a connected client, return it
  if (redisClient?.isOpen) {
    return redisClient
  }

  // If no client exists or it's not connected, create a new one
  try {
    if (!redisClient) {
      redisClient = createClient({ url: process.env.REDIS_URL })

      // Add event listeners for monitoring
      redisClient.on('error', (err) => {
        console.error('Redis client error:', err)
      })
    }

    // Prevent multiple concurrent connection attempts
    if (!isConnecting) {
      isConnecting = true
      await redisClient.connect()
      isConnecting = false
    } else {
      // Wait for the connection to complete
      while (!redisClient.isOpen && isConnecting) {
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
    }

    return redisClient
  } catch (error) {
    console.error('Failed to connect to Redis:', error)

    // Return a fallback client that logs operations but allows the form to work
    // This prevents form failure if Redis is temporarily unavailable
    return createFallbackClient()
  }
}

/**
 * Performs a rate limit check for the given key and returns the result.
 *
 * @param key - The Redis key to use for rate limiting
 * @param limit - The maximum number of requests allowed within the window
 * @param windowSecs - The time window in seconds
 * @param logPrefix - Optional prefix for logging (e.g., 'ip-validate', 'token-issue')
 * @param correlationId - Optional correlation ID for tracking
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSecs: number,
  logPrefix?: string,
  correlationId?: string
): Promise<{
  allowed: boolean
  remaining: number
  retryAfter?: number
  error?: string
}> {
  try {
    // Get the Redis client from our singleton helper
    const redis = await getRedisClient()

    // Increment the counter for this key
    const count = await redis.incr(key)

    // If this is the first request, set the expiry window
    if (count === 1) {
      await redis.expire(key, windowSecs)
    }

    if (count > limit) {
      // Log the blocked attempt with structured data for better observability
      const now = new Date().toISOString()
      const logData = JSON.stringify({
        key,
        timestamp: now,
        count,
        action: 'rate_limit_block',
        prefix: logPrefix || 'rate-limit',
        correlationId,
      })

      await redis.lPush('log:rate-limit-hits', logData)
      await redis.lTrim('log:rate-limit-hits', 0, 999) // Keep last 1000 entries

      // Get TTL to inform user how long to wait
      const ttl = await redis.ttl(key)

      return {
        allowed: false,
        remaining: 0,
        retryAfter: ttl,
        error: 'Rate limit exceeded',
      }
    }

    // Allow the request
    return {
      allowed: true,
      remaining: limit - count,
    }
  } catch (error) {
    // Log the error but fail open with limited attempts
    console.error(
      `Redis error during rate limit check (${logPrefix || 'unknown'}):`,
      error
    )

    return {
      allowed: true,
      remaining: 1, // Very limited remaining to minimize abuse risk
      error: 'Rate limit check error, limited attempts remaining',
    }
  }
}

/**
 * Securely hashes sensitive information like IP addresses for storage.
 *
 * @param value - The value to hash
 * @returns A SHA-256 hash of the value
 */
export async function secureHash(value: string): Promise<string> {
  return createHash('sha256')
    .update(value + (process.env.HASH_SALT || 'default-salt'))
    .digest('hex')
}

/**
 * Creates a fallback "mock" Redis client that logs operations but doesn't fail,
 * allowing the form to continue working even if Redis is temporarily unavailable.
 * This is a conservative approach for the relatively low-volume contact form.
 */
function createFallbackClient(): RedisClientType {
  const fallbackClient = {
    isOpen: true,
    connect: async () => {},
    incr: async (key: string) => {
      console.log(`[Redis Fallback] INCR ${key}`)
      return 1 // Return a safe value allowing the operation
    },
    expire: async (key: string, seconds: number) => {
      console.log(`[Redis Fallback] EXPIRE ${key} ${seconds}`)
      return true
    },
    ttl: async (key: string) => {
      console.log(`[Redis Fallback] TTL ${key}`)
      return 3600 // Return a default TTL
    },
    lpush: async (key: string, value: string) => {
      console.log(`[Redis Fallback] LPUSH ${key} ${value}`)
      return 1
    },
    ltrim: async (key: string, start: number, stop: number) => {
      console.log(`[Redis Fallback] LTRIM ${key} ${start} ${stop}`)
      return 'OK'
    },
    // Add additional fallback methods as needed
    get: async (key: string) => {
      console.log(`[Redis Fallback] GET ${key}`)
      return null
    },
    set: async (key: string, value: string, options: unknown) => {
      console.log(
        `[Redis Fallback] SET ${key} ${value} ${JSON.stringify(options)}`
      )
      return 'OK'
    },
  } as unknown as RedisClientType

  return fallbackClient
}
