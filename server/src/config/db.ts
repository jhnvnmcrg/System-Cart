import mongoose from 'mongoose'
import logger from '../utils/logger'

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/syscart'

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    logger.info(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('⚠️  MongoDB disconnected')
  })

  mongoose.connection.on('reconnected', () => {
    logger.info('🔄 MongoDB reconnected')
  })
}

export default connectDB
