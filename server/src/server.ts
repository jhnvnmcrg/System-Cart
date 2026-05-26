import 'dotenv/config'
import app from './app'
import connectDB from './config/db'
import logger from './utils/logger'

const PORT = parseInt(process.env.PORT || '5000', 10)

const start = async () => {
  // Connect to MongoDB
  await connectDB()

  const server = app.listen(PORT, () => {
    logger.info(`🚀 SysCart API running on http://localhost:${PORT}`)
    logger.info(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
  })

  // ─── Graceful Shutdown ──────────────────────────────────────
  const shutdown = (signal: string) => {
    logger.info(`\n${signal} received — shutting down gracefully...`)
    server.close(() => {
      logger.info('✅ Server closed')
      process.exit(0)
    })

    // Force close after 10s
    setTimeout(() => {
      logger.error('⚠️  Forced shutdown after timeout')
      process.exit(1)
    }, 10_000)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason)
  })

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error)
    process.exit(1)
  })
}

start()
