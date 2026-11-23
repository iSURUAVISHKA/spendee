import { useEffect, useRef, useState } from 'react'
import { sampleProcessingChecks } from '../constants'
import type { DocumentProcessing } from '../types'

const processingMs = 3000
const failureRate = 0.1

export const useSampleProcessing = () => {
  const [processing, setProcessing] = useState<DocumentProcessing | null>(null)
  const timer = useRef({ id: 0 })

  useEffect(() => {
    const active = timer.current

    return () => window.clearTimeout(active.id)
  }, [])

  const runProcessing = (fileName: string) => {
    window.clearTimeout(timer.current.id)
    setProcessing({ fileName, status: 'processing', checks: [] })

    timer.current.id = window.setTimeout(() => {
      if (Math.random() < failureRate) {
        setProcessing({ fileName, status: 'error', checks: [] })
        return
      }

      setProcessing({ fileName, status: 'complete', checks: sampleProcessingChecks })
    }, processingMs)
  }

  const startProcessing = (file: File) => runProcessing(file.name)

  const retryProcessing = () => {
    if (processing) runProcessing(processing.fileName)
  }

  return { processing, startProcessing, retryProcessing }
}
