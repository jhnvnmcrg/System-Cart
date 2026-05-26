import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import { globalLimiter } from './middlewares/rateLimit.middleware'
import { errorHandler } from './middlewares/error.middleware'

import authRoutes     from './routes/auth.routes'
import productRoutes  from './routes/product.routes'
import paymentRoutes  from './routes/payment.routes'
import downloadRoutes from './routes/download.routes'
import userRoutes     from './routes/user.routes'

const app = express()

// ─── Security ─────────────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// ─── Stripe webhook needs raw body — register BEFORE json() ───
app.use(
  '/api/payment/webhook',
  express.raw({ type: 'application/json' })
)

// ─── Body Parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// ─── Logging ──────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
}

// ─── Rate Limiting ────────────────────────────────────────────
app.use('/api', globalLimiter)

// ─── Health Check ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'SysCart API is running 🚀',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// ─── Routes ───────────────────────────────────────────────────
app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/payment',  paymentRoutes)
app.use('/api/download', downloadRoutes)
app.use('/api/users',    userRoutes)

// ─── 404 Handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// ─── Global Error Handler ─────────────────────────────────────
app.use(errorHandler)

export default app
