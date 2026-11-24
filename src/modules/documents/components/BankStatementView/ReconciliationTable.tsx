import { DataTable } from '@/shared/components/DataTable/DataTable'
import { NoData } from '@/shared/components/NoData/NoData'
import { reconciliationEmptyTitles, reconciliationStatusLabels } from '../../constants'
import { useReconciliationTable } from '../../hooks/useReconciliationTable'
import type { ReconciliationEntry, ReconciliationStatus } from '../../types'

interface ReconciliationTableProps {
  status: ReconciliationStatus
  entries: ReconciliationEntry[]
  currency: string
}

export const ReconciliationTable = ({ status, entries, currency }: ReconciliationTableProps) => {
  const { columns } = useReconciliationTable({ status, currency })

  if (entries.length === 0) {
    return <NoData title={reconciliationEmptyTitles[status]} />
  }

  return (
    <DataTable
      label={`${reconciliationStatusLabels[status]} transactions`}
      columns={columns}
      rows={entries}
      getRowId={(entry) => entry.id}
      isLoading={false}
    />
  )
}
