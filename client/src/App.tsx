import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

// Layouts
import MainLayout from '@/components/layout/MainLayout'

// Pages
import Home     from '@/pages/Home'
import Store    from '@/pages/Store'
import Login    from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import NotFound from '@/pages/NotFound'

// Guards
import ProtectedRoute  from '@/components/shared/ProtectedRoute'
import GuestOnlyRoute  from '@/components/shared/GuestOnlyRoute'

export default function App() {
  const { fetchMe, accessToken } = useAuthStore()

  useEffect(() => {
    if (accessToken) fetchMe()
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/"      element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products/:slug" element={<div className="p-10 text-center text-muted">Product Detail — Phase 3</div>} />
        <Route path="/cart"     element={<div className="p-10 text-center text-muted">Cart — Phase 5</div>} />
        <Route path="/checkout" element={<div className="p-10 text-center text-muted">Checkout — Phase 5</div>} />

        {/* Auth — redirect to / if already logged in */}
        <Route path="/login"    element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
        <Route path="/register" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />

        {/* Protected */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <div className="p-10 text-center text-muted">Dashboard — Phase 7</div>
            </ProtectedRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*"    element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}
