import { Outlet } from 'react-router'
import { Sidebar } from '@/shared/widgets/Sidebar/Sidebar'

export const AppLayout = () => {
  return (
    <div className="flex min-h-svh">
      <Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
