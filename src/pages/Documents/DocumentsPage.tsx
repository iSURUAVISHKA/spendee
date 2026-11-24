import {
  DocumentFilters,
  DocumentProcessingCard,
  DocumentsTable,
  DocumentUploadCard,
  documentFilterOptions,
  documentsPageSize,
  useDocumentsTable,
  useSampleDocuments,
  useSampleProcessing,
  useSampleUpload,
} from '@/modules/documents'
import { Button } from '@/shared/components/Button/Button'
import { NoData } from '@/shared/components/NoData/NoData'
import { Pagination } from '@/shared/components/Pagination/Pagination'
import { Text } from '@/shared/components/Text/Text'
import { useFilterParams } from '@/shared/hooks/useFilterParams'
import { usePageParam } from '@/shared/hooks/usePageParam'
import { Header } from '@/shared/widgets/Header/Header'
import { TopBar } from '@/shared/widgets/TopBar/TopBar'

export const DocumentsPage = () => {
  const { processing, startProcessing, retryProcessing } = useSampleProcessing()
  const { upload, selectFile, retryUpload, cancelUpload } = useSampleUpload({
    onComplete: startProcessing,
  })
  const { columns } = useDocumentsTable()
  const { filters, hasFilters, changeFilter, clearFilters } = useFilterParams(documentFilterOptions)
  const [page] = usePageParam(1)

  const documents = useSampleDocuments({ filters, page, pageSize: documentsPageSize })

  const { isLoading, isError } = documents
  const hasRows = !isError && documents.data.length > 0
  const isEmpty = !isLoading && !isError && documents.data.length === 0

  return (
    <>
      <Header title="Documents" />
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DocumentUploadCard
          className="lg:h-84"
          upload={upload}
          onFileSelected={selectFile}
          onRetry={retryUpload}
          onCancel={cancelUpload}
        />
        <DocumentProcessingCard
          className="lg:h-84"
          processing={processing}
          onRetry={retryProcessing}
        />
      </div>
      <section className="mt-8 flex flex-col gap-4">
        <TopBar
          filters={<DocumentFilters filters={filters} onFilterChange={changeFilter} />}
          actions={
            hasFilters && (
              <Button variant="link" disabled={false} onClick={clearFilters}>
                Clear filters
              </Button>
            )
          }
        />
        <DocumentsTable
          columns={columns}
          documents={isError ? [] : documents.data}
          isLoading={isLoading}
        />
        {isError && (
          <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
            <Text size="sm" color="muted">
              Couldn't load your documents.
            </Text>
            <Button variant="secondary" disabled={false} onClick={documents.refetch}>
              Try again
            </Button>
          </div>
        )}
        {isEmpty && (
          <NoData
            title={hasFilters ? 'No matching documents' : 'No documents yet'}
            description={
              hasFilters
                ? 'Try other filters or clear them.'
                : 'Upload a receipt or a flyer to see it here.'
            }
          />
        )}
        {hasRows && <Pagination {...documents.pagination} />}
      </section>
    </>
  )
}
