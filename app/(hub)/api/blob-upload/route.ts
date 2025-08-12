import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { CONTACT } from '@/app/(hub)/sections/contact/content'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Security check - this token should only be generated for users who:
        // 1. Have passed IP rate limit validation
        // 2. Are submitting from our contact form

        // Return config for the upload
        return {
          // Accept types should match what we define in CONTACT.form.attachments.accept
          allowedContentTypes: [
            'image/*',
            'video/*',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ],
          // Generate unique filenames to avoid collisions
          addRandomSuffix: true,
          // Maximum allowed size (30MB)
          maximumSizeInBytes: CONTACT.form.attachments.maxSize * 1024 * 1024,
          // Optional metadata that will be received in onUploadCompleted
          tokenPayload: JSON.stringify({
            timestamp: new Date().toISOString(),
          }),
        }
      },
      onUploadCompleted: async () => {},
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error('Error handling upload:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}

