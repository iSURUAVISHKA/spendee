import { useEffect, useRef, useState } from 'react'
import type { DocumentUpload } from '../types'
import { getDocumentError } from '../utils'

const tickMs = 300
const completeDisplayMs = 2000
const failureRate = 0.2
const uploadFailedMessage = 'Upload failed. Check your connection and try again.'

interface UseSampleUploadOptions {
  onComplete?: (file: File) => void
}

export const useSampleUpload = ({ onComplete }: UseSampleUploadOptions = {}) => {
  const [upload, setUpload] = useState<DocumentUpload | null>(null)
  const timers = useRef({ interval: 0, reset: 0 })

  useEffect(() => {
    const active = timers.current

    return () => {
      window.clearInterval(active.interval)
      window.clearTimeout(active.reset)
    }
  }, [])

  const updateUpload = (id: string, changes: Partial<DocumentUpload>) => {
    setUpload((current) => (current?.id === id ? { ...current, ...changes } : current))
  }

  const stopTimers = () => {
    window.clearInterval(timers.current.interval)
    window.clearTimeout(timers.current.reset)
    timers.current.interval = 0
    timers.current.reset = 0
  }

  const finishUpload = (id: string, file: File) => {
    stopTimers()
    updateUpload(id, { status: 'complete', progress: 100 })
    onComplete?.(file)
    timers.current.reset = window.setTimeout(() => {
      setUpload((current) => (current?.id === id ? null : current))
    }, completeDisplayMs)
  }

  const startUpload = (id: string, file: File) => {
    const failAt = Math.random() < failureRate ? 20 + Math.random() * 60 : null
    let progress = 0

    stopTimers()
    timers.current.interval = window.setInterval(() => {
      progress = Math.min(100, progress + 5 + Math.random() * 15)

      if (failAt !== null && progress >= failAt) {
        stopTimers()
        updateUpload(id, { status: 'error', error: uploadFailedMessage, canRetry: true })
        return
      }

      if (progress >= 100) {
        finishUpload(id, file)
        return
      }

      updateUpload(id, { progress: Math.round(progress) })
    }, tickMs)
  }

  const selectFile = (file: File) => {
    const error = getDocumentError(file)
    const id = crypto.randomUUID()

    stopTimers()
    setUpload({
      id,
      file,
      status: error ? 'error' : 'uploading',
      progress: 0,
      error,
      canRetry: false,
    })

    if (!error) startUpload(id, file)
  }

  const retryUpload = () => {
    if (!upload) return

    updateUpload(upload.id, { status: 'uploading', progress: 0, error: undefined, canRetry: false })
    startUpload(upload.id, upload.file)
  }

  const cancelUpload = () => {
    stopTimers()
    setUpload(null)
  }

  return { upload, selectFile, retryUpload, cancelUpload }
}
