import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

interface CardProps extends ComponentProps<'div'> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border border-muted bg-card p-6 text-foreground',
        className,
      )}
      {...props}
    />
  )
}
