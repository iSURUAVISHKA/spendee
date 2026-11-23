import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

const roundIconVariants = cva(
  'flex size-10 shrink-0 items-center justify-center rounded-full [&>svg]:size-5',
  {
    variants: {
      tone: {
        blue: 'bg-category-blue/15 text-category-blue',
        yellow: 'bg-category-yellow/15 text-category-yellow',
        gray: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      tone: 'gray',
    },
  },
)

interface RoundIconProps extends VariantProps<typeof roundIconVariants> {
  icon: ReactNode
  className?: string
}

export const RoundIcon = ({ icon, tone, className }: RoundIconProps) => {
  return (
    <span aria-hidden className={cn(roundIconVariants({ tone }), className)}>
      {icon}
    </span>
  )
}
