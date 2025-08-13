import { upload } from '@vercel/blob/client'

export async function uploadBlobs(files: File[], handleUploadUrl: string) {
  if (files.length === 0) return []

  try {
    const urls = files.map(async (file) => {
      const { url } = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl,
      })
      return url
    })

    return Promise.all(urls)
  } catch {
    // update global state
    return []
  }
}
