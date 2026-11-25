import { Card } from '@/shared/components/Card/Card'
import { cn } from '@/shared/utils/cn'

interface DealCardSkeletonProps {
  className?: string
}

export const DealCardSkeleton = ({ className }: DealCardSkeletonProps) => {
  return (
    <Card aria-hidden className={cn('h-full gap-4', className)}>
      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      <div className="flex flex-col gap-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-auto flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
      </div>
    </Card>
  )
}
