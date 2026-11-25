import { Outlet } from 'react-router'
import { Sidebar } from '@/shared/widgets/Sidebar/Sidebar'

export const AppLayout = () => {
  return (
    <div className="flex h-svh overflow-hidden">
      <Sidebar />

      <main className="relative min-w-0 flex-1 overflow-y-auto px-4 pb-4">
        <Outlet />
      </main>
    </div>
  )
}
