import { cn } from '@/shared/utils/cn'
import type { SummaryItem } from '../../types'
import { SummaryCard } from '../SummaryCard/SummaryCard'

interface SummaryProps {
  items: SummaryItem[]
  className?: string
}

export const Summary = ({ items, className }: SummaryProps) => {
  return (
    <dl className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}>
      {items.map((item) => (
        <SummaryCard key={item.title} title={item.title} value={item.value} />
      ))}
    </dl>
  )
}
