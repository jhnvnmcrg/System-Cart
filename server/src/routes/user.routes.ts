import { Router } from 'express'

const router = Router()

router.get('/profile/:id',    (_req, res) => res.json({ success: true, message: 'Users — Phase 7' }))
router.put('/profile',        (_req, res) => res.json({ success: true, message: 'Users — Phase 7' }))
router.get('/orders',         (_req, res) => res.json({ success: true, message: 'Users — Phase 7' }))
router.get('/purchases',      (_req, res) => res.json({ success: true, message: 'Users — Phase 7' }))

export default router
