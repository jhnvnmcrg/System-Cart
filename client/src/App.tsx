import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

// Layouts
import MainLayout from '@/components/layout/MainLayout'

// Pages (stubbed — to be built in later phases)
import Home from '@/pages/Home'
import Store from '@/pages/Store'
import NotFound from '@/pages/NotFound'

// Route guards
import ProtectedRoute from '@/components/shared/ProtectedRoute'

export default function App() {
  const { fetchMe, accessToken } = useAuthStore()

  // Rehydrate user on mount if token exists
  useEffect(() => {
    if (accessToken) fetchMe()
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products/:slug" element={<div className="p-10 text-center text-muted">Product Detail — Phase 3</div>} />
        <Route path="/cart" element={<div className="p-10 text-center text-muted">Cart — Phase 5</div>} />
        <Route path="/checkout" element={<div className="p-10 text-center text-muted">Checkout — Phase 5</div>} />

        {/* Auth */}
        <Route path="/login" element={<div className="p-10 text-center text-muted">Login — Phase 2</div>} />
        <Route path="/register" element={<div className="p-10 text-center text-muted">Register — Phase 2</div>} />

        {/* Protected: Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <div className="p-10 text-center text-muted">Dashboard — Phase 7</div>
            </ProtectedRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}
