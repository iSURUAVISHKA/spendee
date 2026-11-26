import { cn } from '@/shared/utils/cn'

interface ShoppingListItemRowSkeletonProps {
  className?: string
}

export const ShoppingListItemRowSkeleton = ({ className }: ShoppingListItemRowSkeletonProps) => {
  return (
    <li aria-hidden className={cn('flex items-center gap-3 py-3 first:pt-0 last:pb-0', className)}>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
      </div>
      <div className="size-9 shrink-0 animate-pulse rounded-md bg-muted" />
    </li>
  )
}
