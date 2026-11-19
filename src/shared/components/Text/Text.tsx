import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/utils/cn'

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      label: 'text-label-foreground',
      destructive: 'text-destructive',
      inherit: '',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
  },
})

// The native `color` attribute is dropped so `color` can be the variant.
type TextProps = Omit<useRender.ComponentProps<'p'>, 'color'> & VariantProps<typeof textVariants>

export const Text = ({ render, className, size, weight, color, ...props }: TextProps) => {
  return useRender({
    defaultTagName: 'p',
    render,
    props: { ...props, className: cn(textVariants({ size, weight, color }), className) },
  })
}
