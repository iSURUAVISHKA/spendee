import { Outlet } from 'react-router'
import { Sidebar } from '@/shared/widgets/Sidebar/Sidebar'

export const AppLayout = () => {
  return (
    <div className="flex h-svh overflow-hidden">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
