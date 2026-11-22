import { Popover as BasePopover } from '@base-ui/react/popover'
import { cn } from '@/shared/utils/cn'
import type { PopoverPopupProps } from './types'

export const PopoverPopup = ({
  side,
  align,
  sideOffset = 4,
  alignOffset,
  className,
  ...props
}: PopoverPopupProps) => {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="outline-none"
      >
        <BasePopover.Popup
          className={cn(
            'origin-(--transform-origin) rounded-lg border border-border bg-popover p-3 text-foreground shadow-lg outline-none transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
            className,
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}
