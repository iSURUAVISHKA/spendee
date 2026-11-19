import { Route, Routes } from 'react-router'
import { ActivityPage } from '@/pages/Activity/ActivityPage'
import { LoginPage } from '@/pages/Auth/LoginPage'
import { DealsPage } from '@/pages/Deals/DealsPage'
import { DocumentsPage } from '@/pages/Documents/DocumentsPage'
import { HomePage } from '@/pages/Home/HomePage'
import { ShoppingListPage } from '@/pages/ShoppingList/ShoppingListPage'
import { AppLayout } from '@/shared/components/AppLayout/AppLayout'

export const AppRoutes = () => (
  <Routes>
    {/* Pages without the sidebar */}
    <Route path="/login" element={<LoginPage />} />

    {/* Pages inside the app shell (sidebar + content) */}
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="activity" element={<ActivityPage />} />
      <Route path="documents" element={<DocumentsPage />} />
      <Route path="deals" element={<DealsPage />} />
      <Route path="shopping-list" element={<ShoppingListPage />} />
    </Route>
  </Routes>
)
