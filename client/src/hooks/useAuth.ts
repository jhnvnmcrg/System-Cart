import { useAuthStore } from '@/store/authStore'

/**
 * Convenience hook — exposes auth state + actions
 * with derived helpers so components don't import the store directly.
 */
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    fetchMe,
  } = useAuthStore()

  const isSeller = user?.role === 'seller' || user?.role === 'admin'
  const isAdmin  = user?.role === 'admin'

  return {
    user,
    isAuthenticated,
    isLoading,
    isSeller,
    isAdmin,
    login,
    register,
    logout,
    fetchMe,
  }
}
