import { Router } from 'express'
import { downloadLimiter } from '../middlewares/rateLimit.middleware'

const router = Router()

// GET /api/download/:token
router.get('/:token', downloadLimiter, (_req, res) =>
  res.json({ success: true, message: 'Downloads — Phase 6' })
)

export default router
