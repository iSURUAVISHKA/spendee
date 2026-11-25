import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

const avatarVariants = cva(
  'flex shrink-0 items-center justify-center bg-avatar font-semibold text-foreground-strong',
  {
    variants: {
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
      size: {
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
      },
    },
    defaultVariants: {
      shape: 'circle',
      size: 'sm',
    },
  },
)

interface AvatarProps extends ComponentProps<'span'>, VariantProps<typeof avatarVariants> {}

export const Avatar = ({ shape, size, className, ...props }: AvatarProps) => {
  return <span className={cn(avatarVariants({ shape, size }), className)} {...props} />
}
