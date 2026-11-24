import { useParams } from 'react-router'
import { DocumentFileLink, DocumentView, useSampleDocument } from '@/modules/documents'
import { Button } from '@/shared/components/Button/Button'
import { NoData } from '@/shared/components/NoData/NoData'
import { Text } from '@/shared/components/Text/Text'
import { Header } from '@/shared/widgets/Header/Header'

export const DocumentViewPage = () => {
  const { documentId = '' } = useParams()
  const { data: doc, isLoading, isError, refetch } = useSampleDocument(documentId)

  const isMissing = !isLoading && !isError && !doc

  return (
    <>
      <Header
        title={doc?.fileName ?? 'Document'}
        backTo="/documents"
        actions={doc && doc.kind !== 'receipt' && <DocumentFileLink href={doc.fileUrl} />}
      />
      {doc && <DocumentView doc={doc} className="mt-4" />}
      {isError && (
        <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
          <Text size="sm" color="muted">
            Couldn't load this document.
          </Text>
          <Button variant="secondary" disabled={false} onClick={refetch}>
            Try again
          </Button>
        </div>
      )}
      {isMissing && (
        <NoData
          title="Document not found"
          description="It may have been deleted. Go back to see your documents."
        />
      )}
    </>
  )
}
