import { Link } from 'react-router'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import type { TableColumn } from '@/shared/components/Table/types'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatTimestamp } from '@/shared/utils/dates'
import { DocumentKindIcon } from '../components/DocumentKindIcon/DocumentKindIcon'
import { DocumentStatusLabel } from '../components/DocumentStatusLabel/DocumentStatusLabel'
import { documentKindLabels } from '../constants'
import type { UploadedDocument } from '../types'
import { getDocumentAction, getFindingsDetail, getFindingsSource } from '../utils'

export const useDocumentsTable = () => {
  const columns: TableColumn<UploadedDocument>[] = [
    {
      id: 'fileName',
      header: 'File',
      cell: (doc) => (
        <Text
          render={<span />}
          size="sm"
          weight="medium"
          color="strong"
          className="block max-w-40 truncate sm:max-w-56"
          title={doc.fileName}
        >
          {doc.fileName}
        </Text>
      ),
    },
    {
      id: 'kind',
      header: 'Type',
      className: 'hidden whitespace-nowrap lg:table-cell',
      cell: (doc) => (
        <div className="flex items-center gap-3">
          <DocumentKindIcon kind={doc.kind} />
          <Text render={<span />} size="sm">
            {documentKindLabels[doc.kind]}
          </Text>
        </div>
      ),
    },
    {
      id: 'uploadedAt',
      header: 'Uploaded',
      className: 'hidden whitespace-nowrap sm:table-cell',
      cell: (doc) => (
        <Text render={<time dateTime={doc.uploadedAt} />} size="sm" color="muted">
          {formatTimestamp(doc.uploadedAt)}
        </Text>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (doc) => <DocumentStatusLabel status={doc.status} />,
    },
    {
      id: 'findings',
      header: 'What we found',
      className: 'hidden whitespace-nowrap md:table-cell',
      cell: (doc) => (
        <div className="flex flex-col gap-0.5">
          <Text render={<span />} size="sm" weight="medium" color="strong">
            {getFindingsSource(doc)}
          </Text>
          <Text
            render={<span />}
            size="sm"
            color="muted"
            className={cn(doc.kind === 'receipt' && 'tabular-nums')}
          >
            {getFindingsDetail(doc)}
          </Text>
        </div>
      ),
    },
    {
      id: 'action',
      header: <span className="sr-only">Action</span>,
      align: 'right',
      cell: (doc) => {
        const action = getDocumentAction(doc)

        return (
          <Link
            to={`/documents/${doc.id}`}
            aria-label={`${action} ${doc.fileName}`}
            className={buttonVariants({ variant: 'secondary' })}
          >
            {action}
          </Link>
        )
      },
    },
  ]

  return { columns }
}
