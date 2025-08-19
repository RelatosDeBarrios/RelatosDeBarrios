import { upload } from '@vercel/blob/client'

export async function uploadBlobs(
  files: File[],
  handleUploadUrl: string
): Promise<{ success: boolean; paths: string[]; message: string }> {
  if (files.length === 0)
    return {
      success: false,
      paths: [],
      message: 'No files to upload',
    }

  try {
    const urls = files.map(async (file) => {
      const { url } = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl,
      })
      return url
    })

    return {
      success: true,
      paths: await Promise.all(urls),
      message: 'Files uploaded successfully',
    }
  } catch {
    // update global state
    return {
      success: false,
      paths: [],
      message: 'Error uploading files',
    }
  }
}
