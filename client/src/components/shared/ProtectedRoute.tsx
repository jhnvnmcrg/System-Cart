import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  allowedRoles?: ('buyer' | 'seller' | 'admin')[]
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
