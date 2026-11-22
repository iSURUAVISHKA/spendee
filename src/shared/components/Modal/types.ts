import type { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ReactElement, ReactNode } from 'react'

export interface ModalProps extends Omit<BaseDialog.Root.Props, 'children'> {
  title: ReactNode
  children: ReactNode
  actions?: ReactNode
  trigger?: ReactElement
  className?: string
}

export interface ModalCloseProps extends Omit<BaseDialog.Close.Props, 'className'> {
  className?: string
}
