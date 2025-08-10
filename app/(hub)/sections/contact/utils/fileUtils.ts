import { DropzoneFile } from '../types/attachments'

export function processImageFile(file: File): Promise<DropzoneFile> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => {
      resolve({
        file,
        src: objectUrl,
        width: img.width,
        height: img.height,
        type: file.type,
        name: file.name,
      })
    }
    img.onerror = () => {
      // fallback: still resolve, but no dimensions
      resolve({
        file,
        src: objectUrl,
        type: file.type,
        name: file.name,
      })
    }
    img.src = objectUrl
  })
}

export function processNonImageFile(file: File): DropzoneFile {
  return {
    file,
    type: file.type,
    name: file.name,
  }
}

export function createDataTransfer(files: File[]): DataTransfer {
  const dataTransfer = new DataTransfer()
  files.forEach((file) => dataTransfer.items.add(file))
  return dataTransfer
}
