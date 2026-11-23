import { fileUploadAccept } from './constants'

const sizeUnits = ['B', 'KB', 'MB', 'GB']

export const formatFileSize = (bytes: number) => {
  let value = bytes
  let unit = 0

  while (value >= 1024 && unit < sizeUnits.length - 1) {
    value /= 1024
    unit += 1
  }

  const digits = unit === 0 || value >= 10 ? 0 : 1

  return `${value.toFixed(digits)} ${sizeUnits[unit]}`
}

export const isAcceptedFile = (file: File) => {
  const name = file.name.toLowerCase()

  return fileUploadAccept.some((extension) => name.endsWith(extension))
}
