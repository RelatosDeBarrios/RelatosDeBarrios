export async function validateIp(validateIpUrl: string) {
  try {
    const response = await fetch(validateIpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!result.allowed) {
      const errorMsg =
        result.error ||
        `Rate limit exceeded. You have ${result.remaining} uploads remaining.` +
          (result.retryAfter
            ? ` Please try again in ${Math.ceil(result.retryAfter / 60)} minutes.`
            : '')

      return {
        allowed: false,
        error: result.error,
        message: errorMsg,
      }
    }

    return {
      allowed: result.allowed,
      error: null,
      message: null,
    }
  } catch (error) {
    return {
      allowed: false,
      error,
      message: 'Error validating IP address',
    }
  }
}
