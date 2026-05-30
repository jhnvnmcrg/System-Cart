import { Router } from 'express'
import { authLimiter } from '../middlewares/rateLimit.middleware'
import { authenticate } from '../middlewares/auth.middleware'
import { registerValidators, loginValidators } from '../middlewares/validators/auth.validators'
import {
  register,
  login,
  logout,
  refresh,
  getMe,
  forgotPassword,
} from '../controllers/auth.controller'

const router = Router()

// POST /api/auth/register
router.post('/register', authLimiter, registerValidators, register)

// POST /api/auth/login
router.post('/login', authLimiter, loginValidators, login)

// POST /api/auth/logout
router.post('/logout', logout)

// POST /api/auth/refresh
router.post('/refresh', refresh)

// GET /api/auth/me  (protected)
router.get('/me', authenticate, getMe)

// POST /api/auth/forgot-password
router.post('/forgot-password', authLimiter, forgotPassword)

export default router
