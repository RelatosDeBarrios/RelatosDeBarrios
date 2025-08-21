import { upload } from '@vercel/blob/client'

/**
 * Uploads files to Vercel Blob storage using the provided endpoint.
 * Passes the correlation ID for request tracing.
 *
 * @param files - Array of files to upload
 * @param handleUploadUrl - URL to the blob-upload API endpoint
 * @param correlationId - Optional correlation ID for request tracing
 * @returns Result including success status, uploaded paths and status message
 */
export async function uploadBlobs(
  files: File[],
  handleUploadUrl: string,
  correlationId?: string
): Promise<{
  success: boolean
  paths: string[]
  message: string
  correlationId?: string
}> {
  if (files.length === 0)
    return {
      success: true,
      paths: [],
      message: 'No files to upload',
      correlationId,
    }

  try {
    // Add headers to include the correlation ID if provided
    const uploadOptions = {
      access: 'public' as const, // Type assertion to fix the 'public' string type
      handleUploadUrl,
      ...(correlationId
        ? {
            customFetchOptions: {
              headers: { 'X-Correlation-Id': correlationId },
            },
          }
        : {}),
    }

    const urls = files.map(async (file) => {
      const { url } = await upload(file.name, file, uploadOptions)
      return url
    })

    return {
      success: true,
      paths: await Promise.all(urls),
      message: 'Files uploaded successfully',
      correlationId,
    }
  } catch (error) {
    console.error('Error uploading files:', error)
    return {
      success: false,
      paths: [],
      message: error instanceof Error ? error.message : 'Error uploading files',
      correlationId,
    }
  }
}
