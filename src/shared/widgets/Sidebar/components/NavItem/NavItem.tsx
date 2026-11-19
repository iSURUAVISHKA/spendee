import type { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router'
import { cn } from '@/shared/utils/cn'

type NavItemProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  name: string
  route: string
  className?: string
}

export const NavItem = ({ icon: Icon, name, route, className }: NavItemProps) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-sidebar-item-foreground transition-colors outline-none hover:bg-sidebar-accent/50 focus-visible:ring-[3px] focus-visible:ring-ring/50',
          isActive && 'bg-sidebar-accent [&_[stroke]]:stroke-current',
          className,
        )
      }
    >
      <Icon aria-hidden className="size-5 shrink-0" />
      {name}
    </NavLink>
  )
}
