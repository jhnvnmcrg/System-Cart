import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { authService } from '@/services/auth.service'

interface AuthState {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  isAuthenticated: boolean

  setUser: (user: User | null) => void
  setAccessToken: (token: string | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: 'buyer' | 'seller') => Promise<void>
  logout: () => Promise<void>
  fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAccessToken: (token) => {
        set({ accessToken: token })
        if (token) localStorage.setItem('accessToken', token)
        else localStorage.removeItem('accessToken')
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await authService.login({ email, password })
          const { user, accessToken } = res.data.data
          get().setAccessToken(accessToken)
          set({ user, isAuthenticated: true })
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (name, email, password, role = 'buyer') => {
        set({ isLoading: true })
        try {
          const res = await authService.register({ name, email, password, role })
          const { user, accessToken } = res.data.data
          get().setAccessToken(accessToken)
          set({ user, isAuthenticated: true })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        try {
          await authService.logout()
        } finally {
          get().setAccessToken(null)
          set({ user: null, isAuthenticated: false })
        }
      },

      fetchMe: async () => {
        try {
          const res = await authService.me()
          set({ user: res.data.data, isAuthenticated: true })
        } catch {
          get().setAccessToken(null)
          set({ user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'syscart-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
