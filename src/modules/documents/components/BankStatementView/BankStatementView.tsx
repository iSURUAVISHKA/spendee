import { Tabs } from '@/shared/components/Tabs/Tabs'
import { TabsList } from '@/shared/components/Tabs/TabsList'
import { TabsPanel } from '@/shared/components/Tabs/TabsPanel'
import { cn } from '@/shared/utils/cn'
import { reconciliationStatuses } from '../../constants'
import { useReconciliationParam } from '../../hooks/useReconciliationParam'
import type { BankStatementDocument, ReconciliationStatus } from '../../types'
import { ReconciliationTab } from './ReconciliationTab'
import { ReconciliationTable } from './ReconciliationTable'

interface BankStatementViewProps {
  statement: BankStatementDocument
  className?: string
}

export const BankStatementView = ({ statement, className }: BankStatementViewProps) => {
  const { entries, currency } = statement.findings
  const [selectedStatus, setSelectedStatus] = useReconciliationParam()

  const getEntries = (status: ReconciliationStatus) =>
    entries.filter((entry) => entry.status === status)

  return (
    <Tabs
      value={selectedStatus}
      onValueChange={setSelectedStatus}
      className={cn('flex flex-col gap-4', className)}
    >
      <TabsList aria-label="Filter transactions" className="grid grid-cols-2 lg:grid-cols-4">
        {reconciliationStatuses.map((status) => (
          <ReconciliationTab key={status} status={status} count={getEntries(status).length} />
        ))}
      </TabsList>
      {reconciliationStatuses.map((status) => (
        <TabsPanel key={status} value={status}>
          <ReconciliationTable status={status} entries={getEntries(status)} currency={currency} />
        </TabsPanel>
      ))}
    </Tabs>
  )
}
