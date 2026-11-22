import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { cn } from '@/shared/utils/cn'
import type { ModalCloseProps } from './types'

export const ModalClose = ({ className, ...props }: ModalCloseProps) => {
  return (
    <BaseDialog.Close
      className={cn(buttonVariants({ variant: 'secondary' }), className)}
      {...props}
    />
  )
}
