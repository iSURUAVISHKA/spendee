import { useNavigate } from 'react-router'
import ActivityIcon from '@/shared/assets/icon/Activity.svg?react'
import DashboardIcon from '@/shared/assets/icon/Dashboard.svg?react'
import DealsIcon from '@/shared/assets/icon/Deals.svg?react'
import DocsIcon from '@/shared/assets/icon/Docs.svg?react'
import ShoppingListIcon from '@/shared/assets/icon/ShoppingList.svg?react'
import { Brand } from './components/Brand/Brand'
import { NavItem } from './components/NavItem/NavItem'
import { UserDetail } from './components/UserDetail/UserDetail'

const navItems = [
  { icon: DashboardIcon, name: 'Home', route: '/' },
  { icon: ActivityIcon, name: 'Activity', route: '/activity' },
  { icon: DocsIcon, name: 'Documents', route: '/documents' },
  { icon: DealsIcon, name: 'Deals', route: '/deals' },
  { icon: ShoppingListIcon, name: 'Shopping list', route: '/shopping-list' },
]

const user = { firstName: 'Jane', lastName: 'Doe' }

export const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-1 bg-sidebar p-4 text-sidebar-foreground">
      <Brand className="mb-7.5" />
      <nav aria-label="Main" className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem key={item.route} icon={item.icon} name={item.name} route={item.route} />
        ))}
      </nav>
      <UserDetail
        firstName={user.firstName}
        lastName={user.lastName}
        onLogout={handleLogout}
        className="mt-auto"
      />
    </aside>
  )
}
