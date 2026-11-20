import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'
import { cn } from '@/shared/utils/cn'

// Optional: tooltips inside one Provider share a delay, so moving between them opens the next instantly.
export const TooltipProvider = BaseTooltip.Provider

export const Tooltip = BaseTooltip.Root

export const TooltipTrigger = BaseTooltip.Trigger

interface TooltipPopupProps
  extends
    Omit<BaseTooltip.Popup.Props, 'className'>,
    Pick<BaseTooltip.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset'> {
  className?: string
}

// Wraps Portal and Positioner, so callers only place the popup: <TooltipPopup side="bottom">.
export const TooltipPopup = ({
  side,
  align,
  sideOffset = 6,
  alignOffset,
  className,
  ...props
}: TooltipPopupProps) => {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        <BaseTooltip.Popup
          className={cn(
            'origin-(--transform-origin) rounded-md border border-border bg-popover px-2 py-1 text-xs text-foreground shadow-lg transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-95 data-starting-style:opacity-0',
            className,
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}
