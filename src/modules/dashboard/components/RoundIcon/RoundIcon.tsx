import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/utils/cn'

const roundIconVariants = cva('flex size-10 shrink-0 items-center justify-center rounded-full', {
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
})

interface RoundIconProps extends VariantProps<typeof roundIconVariants> {
  icon: IconSvgElement
  className?: string
}

export const RoundIcon = ({ icon, tone, className }: RoundIconProps) => {
  return (
    <span aria-hidden className={cn(roundIconVariants({ tone }), className)}>
      <HugeiconsIcon icon={icon} className="size-5" />
    </span>
  )
}
