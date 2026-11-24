import { DataTable } from '@/shared/components/DataTable/DataTable'
import type { DataTableProps } from '@/shared/components/DataTable/types'
import type { UploadedDocument } from '../../types'

interface DocumentsTableProps extends Omit<
  DataTableProps<UploadedDocument>,
  'label' | 'rows' | 'getRowId'
> {
  documents: UploadedDocument[]
}

export const DocumentsTable = ({ documents, ...props }: DocumentsTableProps) => {
  return (
    <DataTable
      label="Documents"
      rows={documents}
      getRowId={(doc) => doc.id}
      skeletonRows={5}
      {...props}
    />
  )
}
