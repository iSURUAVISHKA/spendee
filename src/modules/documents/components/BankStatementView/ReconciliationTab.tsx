import { TabsTab } from '@/shared/components/Tabs/TabsTab'
import { Text } from '@/shared/components/Text/Text'
import { reconciliationStatusLabels } from '../../constants'
import type { ReconciliationStatus } from '../../types'

interface ReconciliationTabProps {
  status: ReconciliationStatus
  count: number
}

export const ReconciliationTab = ({ status, count }: ReconciliationTabProps) => {
  return (
    <TabsTab value={status}>
      <Text render={<span />} size="lg" weight="medium" color="muted">
        {reconciliationStatusLabels[status]}
      </Text>
      <Text render={<span />} size="2xl" weight="semibold" color="strong" className="tabular-nums">
        {count}
      </Text>
    </TabsTab>
  )
}
