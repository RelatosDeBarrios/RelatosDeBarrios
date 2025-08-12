import { upload, type PutBlobResult } from '@vercel/blob/client'

/**
 * Uploads a file to Vercel Blob and returns the blob result.
 * @param file File to upload
 * @param handleUploadUrl API route for token exchange (e.g. '/api/contact/blob-upload')
 * @returns PutBlobResult (url, pathname, etc)
 */
export async function uploadToVercelBlob(file: File, handleUploadUrl: string): Promise<PutBlobResult> {
  // Use addRandomSuffix to avoid collisions
  return upload(file.name, file, {
    access: 'public',
    addRandomSuffix: true,
    handleUploadUrl,
  })
}
