'use client'

/**
 * Deletes uploaded blobs if email sending fails
 *
 * @param urls Array of blob URLs to clean up
 * @param correlationId Optional tracking ID for logs
 * @returns Cleanup result
 */
export async function cleanupBlobs(
  urls: string[],
  correlationId?: string
): Promise<{ success: boolean; deleted: number; total: number }> {
  if (!urls || urls.length === 0) {
    return { success: true, deleted: 0, total: 0 }
  }

  try {
    // Call internal cleanup endpoint with the blob URLs
    const response = await fetch('/api/cleanup-blobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret':
          process.env.NEXT_PUBLIC_INTERNAL_CLEANUP_SECRET ||
          'change-me-in-production',
        ...(correlationId ? { 'X-Correlation-Id': correlationId } : {}),
      },
      body: JSON.stringify({
        urls,
        correlationId,
      }),
    })

    if (!response.ok) {
      console.error('Failed to clean up blobs:', await response.text())
      return { success: false, deleted: 0, total: urls.length }
    }

    const result = await response.json()
    return {
      success: true,
      deleted: result.deleted || 0,
      total: urls.length,
    }
  } catch (error) {
    console.error('Error cleaning up blobs:', error)
    return { success: false, deleted: 0, total: urls.length }
  }
}
