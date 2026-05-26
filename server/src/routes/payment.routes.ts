import { Router } from 'express'

const router = Router()

router.post('/create-session', (_req, res) => res.json({ success: true, message: 'Payment — Phase 5' }))
router.post('/webhook',        (_req, res) => res.json({ success: true, message: 'Payment — Phase 6' }))

export default router
