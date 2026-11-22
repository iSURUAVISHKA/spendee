import type { Popover as BasePopover } from '@base-ui/react/popover'

export interface PopoverPopupProps
  extends
    Omit<BasePopover.Popup.Props, 'className'>,
    Pick<BasePopover.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset'> {
  className?: string
}
