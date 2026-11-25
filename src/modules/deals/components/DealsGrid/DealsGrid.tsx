import { cn } from '@/shared/utils/cn'
import type { Deal } from '../../types'
import { DealCard } from '../DealCard/DealCard'
import { DealCardSkeleton } from '../DealCard/DealCardSkeleton'

interface DealsGridProps {
  deals: Deal[]
  isLoading: boolean
  onAdd: (deal: Deal) => void
  skeletonCount?: number
  className?: string
}

export const DealsGrid = ({
  deals,
  isLoading,
  onAdd,
  skeletonCount = 8,
  className,
}: DealsGridProps) => {
  return (
    <ul
      aria-label="Deals"
      aria-busy={isLoading}
      className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4', className)}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, index) => (
            <li key={index}>
              <DealCardSkeleton />
            </li>
          ))
        : deals.map((deal) => (
            <li key={deal.id}>
              <DealCard deal={deal} onAdd={onAdd} />
            </li>
          ))}
    </ul>
  )
}
