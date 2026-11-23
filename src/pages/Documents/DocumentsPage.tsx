import {
  DocumentProcessingCard,
  DocumentUploadCard,
  useSampleProcessing,
  useSampleUpload,
} from '@/modules/documents'
import { Header } from '@/shared/widgets/Header/Header'

export const DocumentsPage = () => {
  const { processing, startProcessing, retryProcessing } = useSampleProcessing()
  const { upload, selectFile, retryUpload, cancelUpload } = useSampleUpload({
    onComplete: startProcessing,
  })

  return (
    <>
      <Header title="Documents" />
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DocumentUploadCard
          upload={upload}
          onFileSelected={selectFile}
          onRetry={retryUpload}
          onCancel={cancelUpload}
        />
        <DocumentProcessingCard processing={processing} onRetry={retryProcessing} />
      </div>
    </>
  )
}
