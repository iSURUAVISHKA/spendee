import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

interface BadgeProps extends ComponentProps<'span'> {}

export const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-sm text-foreground-strong',
        className,
      )}
      {...props}
    />
  )
}
