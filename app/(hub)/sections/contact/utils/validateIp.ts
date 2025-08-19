import { v4 as uuidv4 } from 'uuid'

/**
 * Validates IP address via the validate-ip endpoint.
 * Also establishes a correlationId for tracing the request flow.
 *
 * @param validateIpUrl - URL to the validate-ip API endpoint
 * @returns Result including allowed status and correlationId for tracking
 */
export async function validateIp(validateIpUrl: string): Promise<{
  allowed: boolean
  error?: unknown
  message?: string | null
  correlationId?: string
  retryAfter?: number
}> {
  try {
    // Create a correlation ID to track this request across the system
    const correlationId = uuidv4() as string

    const response = await fetch(validateIpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-Id': correlationId,
      },
    })

    // Keep the correlation ID from the response headers if provided
    const responseCorrelationId =
      response.headers.get('X-Correlation-Id') || correlationId

    const result = await response.json()

    if (!result.allowed) {
      return {
        allowed: false,
        error: result.error,
        message: result.error || null,
        correlationId: responseCorrelationId,
        retryAfter:
          typeof result.retryAfter === 'number' ? result.retryAfter : undefined,
      }
    }

    return {
      allowed: result.allowed,
      error: null,
      message: null,
      correlationId: responseCorrelationId,
    }
  } catch (error) {
    return {
      allowed: false,
      error,
      message: 'Error validating IP address',
      correlationId: undefined,
    }
  }
}
