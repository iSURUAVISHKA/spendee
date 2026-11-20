import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

interface LabelProps extends ComponentProps<'label'> {}

export const Label = ({ className, htmlFor, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-medium text-label-foreground', className)}
      {...props}
    />
  )
}
