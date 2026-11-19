import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/utils/cn'

// A ring drawn in currentColor with one transparent side, so it takes the text color around it.
const spinnerVariants = cva(
  'inline-block shrink-0 animate-spin rounded-full border-current border-r-transparent',
  {
    variants: {
      size: {
        sm: 'size-4 border-2',
        md: 'size-6 border-2',
        lg: 'size-10 border-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

type SpinnerProps = Omit<ComponentProps<'output'>, 'children'> &
  VariantProps<typeof spinnerVariants> & {
    label?: string
  }

export const Spinner = ({ label = 'Loading', size, className, ...props }: SpinnerProps) => {
  return (
    <output className={cn('inline-flex items-center justify-center', className)} {...props}>
      <span aria-hidden="true" className={spinnerVariants({ size })} />
      <span className="sr-only">{label}</span>
    </output>
  )
}
