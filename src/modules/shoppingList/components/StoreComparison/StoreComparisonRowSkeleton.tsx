import { cn } from '@/shared/utils/cn'

interface StoreComparisonRowSkeletonProps {
  className?: string
}

export const StoreComparisonRowSkeleton = ({ className }: StoreComparisonRowSkeletonProps) => {
  return (
    <li
      aria-hidden
      className={cn('flex items-center gap-3 rounded-md border border-muted p-3', className)}
    >
      <div className="size-10 shrink-0 animate-pulse rounded-md bg-muted" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-4 w-16 shrink-0 animate-pulse rounded bg-muted" />
    </li>
  )
}
