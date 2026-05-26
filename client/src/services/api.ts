import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // sends httpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ──────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response Interceptor ─────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Try refresh token on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const res = await axios.post('/api/auth/refresh', {}, { withCredentials: true })
        const { accessToken } = res.data.data
        localStorage.setItem('accessToken', accessToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api
