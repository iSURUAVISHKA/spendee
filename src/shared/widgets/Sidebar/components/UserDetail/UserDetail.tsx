import { Menu, MenuItem, MenuPopup, MenuTrigger } from '@/shared/components/Menu/Menu'
import { cn } from '@/shared/utils/cn'

interface UserDetailProps {
  firstName: string
  lastName: string
  onLogout: () => void
  className?: string
}

export const UserDetail = ({ firstName, lastName, onLogout, className }: UserDetailProps) => {
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()

  return (
    <Menu>
      <MenuTrigger
        className={cn(
          'flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm text-foreground-strong transition-colors hover:bg-sidebar-accent/50 data-popup-open:bg-sidebar-accent',
          className,
        )}
      >
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-avatar text-xs font-semibold text-foreground-strong"
        >
          {initials}
        </span>
        <span className="truncate">
          {firstName} {lastName}
        </span>
      </MenuTrigger>
      <MenuPopup side="top" sideOffset={8} className="w-(--anchor-width)">
        <MenuItem onClick={onLogout}>Log out</MenuItem>
      </MenuPopup>
    </Menu>
  )
}
