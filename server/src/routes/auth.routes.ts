import { Router } from 'express'
import { authLimiter } from '../middlewares/rateLimit.middleware'

const router = Router()

// POST /api/auth/register
router.post('/register', authLimiter, (_req, res) => res.json({ success: true, message: 'Auth — Phase 2' }))

// POST /api/auth/login
router.post('/login', authLimiter, (_req, res) => res.json({ success: true, message: 'Auth — Phase 2' }))

// POST /api/auth/logout
router.post('/logout', (_req, res) => res.json({ success: true, message: 'Auth — Phase 2' }))

// POST /api/auth/refresh
router.post('/refresh', (_req, res) => res.json({ success: true, message: 'Auth — Phase 2' }))

// GET /api/auth/me
router.get('/me', (_req, res) => res.json({ success: true, message: 'Auth — Phase 2' }))

export default router
