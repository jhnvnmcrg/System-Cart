import api from './api'
import type { User, LoginPayload, RegisterPayload, ApiResponse, AuthTokens } from '@/types'

export const authService = {
  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<{ user: User; accessToken: string }>>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    api.post<ApiResponse<{ user: User; accessToken: string }>>('/auth/login', payload),

  logout: () =>
    api.post('/auth/logout'),

  refresh: () =>
    api.post<ApiResponse<AuthTokens>>('/auth/refresh'),

  me: () =>
    api.get<ApiResponse<User>>('/auth/me'),
}
