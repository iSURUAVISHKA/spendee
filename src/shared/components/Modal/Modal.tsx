import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import CloseIcon from '@/shared/assets/icon/Close.svg?react'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { cn } from '@/shared/utils/cn'
import { ModalClose } from './ModalClose'
import type { ModalProps } from './types'

export const Modal = ({
  title,
  children,
  actions = <ModalClose>Cancel</ModalClose>,
  trigger,
  className,
  ...props
}: ModalProps) => {
  return (
    <BaseDialog.Root {...props}>
      {trigger && <BaseDialog.Trigger render={trigger} />}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 min-h-dvh bg-background/80 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <BaseDialog.Viewport className="fixed inset-0 flex items-center justify-center p-4">
          <BaseDialog.Popup
            className={cn(
              'flex max-h-full min-h-0 w-full max-w-lg flex-col rounded-xl bg-card text-foreground shadow-lg outline-none transition-[scale,opacity] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
              className,
            )}
          >
            <div className="mx-6 flex items-center justify-between gap-4 border-b border-muted pt-4 pb-3">
              <BaseDialog.Title className="min-w-0 text-xl font-semibold text-foreground-strong">
                {title}
              </BaseDialog.Title>
              <BaseDialog.Close
                aria-label="Close"
                className={cn(buttonVariants({ variant: 'secondary', size: 'icon' }), 'size-8')}
              >
                <CloseIcon aria-hidden />
              </BaseDialog.Close>
            </div>
            <div className="min-h-0 overflow-y-auto p-6">{children}</div>
            {actions && (
              <div className="flex flex-wrap justify-center gap-3 px-6 pt-2 pb-6">{actions}</div>
            )}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}
