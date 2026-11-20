import type { Category } from '@/shared/types/category'
import { cn } from '@/shared/utils/cn'

interface CategoryIconProps {
  category: Category
  className?: string
}

export const CategoryIcon = ({ category, className }: CategoryIconProps) => {
  const Icon = category.icon

  return (
    <span
      aria-hidden
      className={cn(
        'flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-sidebar-foreground',
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  )
}
