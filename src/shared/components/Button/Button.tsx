import { Button as BaseButton } from '@base-ui/react/button'
import { cn } from '@/shared/utils/cn'
import { buttonVariants, type ButtonVariantProps } from './buttonVariants'

type ButtonProps = Omit<BaseButton.Props, 'className'> &
  ButtonVariantProps & {
    className?: string
    disabled: boolean
  }

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <BaseButton className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
