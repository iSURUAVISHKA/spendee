import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'

interface SummaryCardProps {
  title: string
  value: string
  className?: string
}

export const SummaryCard = ({ title, value, className }: SummaryCardProps) => {
  return (
    <Card className={cn('flex flex-col gap-2', className)}>
      <Text render={<dt />} size="sm" color="muted">
        {title}
      </Text>
      <Text render={<dd />} size="2xl" weight="semibold" color="strong">
        {value}
      </Text>
    </Card>
  )
}
