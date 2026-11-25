import { cn } from '@/shared/utils/cn'

interface StoreFlyerRowSkeletonProps {
  className?: string
}

export const StoreFlyerRowSkeleton = ({ className }: StoreFlyerRowSkeletonProps) => {
  return (
    <li aria-hidden className={cn('flex items-center gap-3 py-3 first:pt-0 last:pb-0', className)}>
      <div className="size-10 shrink-0 animate-pulse rounded-md bg-muted" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
      <div className="h-9 w-20 shrink-0 animate-pulse rounded-md bg-muted" />
    </li>
  )
}
