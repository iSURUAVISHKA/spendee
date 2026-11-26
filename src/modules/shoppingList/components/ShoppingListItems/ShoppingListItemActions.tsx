import { Delete02Icon, MoreHorizontalIcon, PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { buttonVariants } from '@/shared/components/Button/buttonVariants'
import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@/shared/components/Menu/Menu'
import { cn } from '@/shared/utils/cn'
import type { ShoppingListItem } from '../../types'

interface ShoppingListItemActionsProps {
  item: ShoppingListItem
  onEdit: (item: ShoppingListItem) => void
  onDelete: (item: ShoppingListItem) => void
  className?: string
}

export const ShoppingListItemActions = ({
  item,
  onEdit,
  onDelete,
  className,
}: ShoppingListItemActionsProps) => {
  return (
    <Menu>
      <MenuTrigger
        aria-label={`Actions for ${item.name}`}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'data-popup-open:text-foreground-strong',
          className,
        )}
      >
        <HugeiconsIcon icon={MoreHorizontalIcon} className="size-5" aria-hidden />
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem onClick={() => onEdit(item)}>
          <HugeiconsIcon icon={PencilEdit02Icon} className="size-4" aria-hidden />
          Edit
        </MenuItem>
        <MenuItem onClick={() => onDelete(item)} className="text-destructive">
          <HugeiconsIcon icon={Delete02Icon} className="size-4" aria-hidden />
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  )
}
