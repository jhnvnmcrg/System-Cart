import { Router } from 'express'

const router = Router()

router.get('/',              (_req, res) => res.json({ success: true, message: 'Products — Phase 3' }))
router.get('/seller/my-products', (_req, res) => res.json({ success: true, message: 'Products — Phase 3' }))
router.get('/:slug',        (_req, res) => res.json({ success: true, message: 'Products — Phase 3' }))
router.post('/',            (_req, res) => res.json({ success: true, message: 'Products — Phase 3' }))
router.put('/:id',          (_req, res) => res.json({ success: true, message: 'Products — Phase 3' }))
router.delete('/:id',       (_req, res) => res.json({ success: true, message: 'Products — Phase 3' }))

export default router
