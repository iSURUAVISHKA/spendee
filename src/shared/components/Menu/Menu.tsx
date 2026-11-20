import { Menu as BaseMenu } from '@base-ui/react/menu'
import { cn } from '@/shared/utils/cn'

export const Menu = BaseMenu.Root

interface MenuTriggerProps extends Omit<BaseMenu.Trigger.Props, 'className'> {
  className?: string
}

export const MenuTrigger = ({ className, ...props }: MenuTriggerProps) => {
  return (
    <BaseMenu.Trigger
      className={cn(
        'cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    />
  )
}

interface MenuPopupProps
  extends
    Omit<BaseMenu.Popup.Props, 'className'>,
    Pick<BaseMenu.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset'> {
  className?: string
}

// Wraps Portal and Positioner, so callers only place the popup: <MenuPopup side="top">.
export const MenuPopup = ({
  side,
  align,
  sideOffset = 4,
  alignOffset,
  className,
  ...props
}: MenuPopupProps) => {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="outline-none"
      >
        <BaseMenu.Popup
          className={cn(
            'min-w-32 origin-(--transform-origin) rounded-lg border border-border bg-popover p-1 text-foreground shadow-lg outline-none transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
            className,
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

interface MenuItemProps extends Omit<BaseMenu.Item.Props, 'className'> {
  className?: string
}

export const MenuItem = ({ className, ...props }: MenuItemProps) => {
  return (
    <BaseMenu.Item
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}
