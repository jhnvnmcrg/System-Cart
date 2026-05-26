import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/errors'
import logger from '../utils/logger'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: err.message,
    })
  }

  // Mongoose duplicate key
  if ((err as NodeJS.ErrnoException).code === '11000') {
    return res.status(409).json({
      success: false,
      message: 'Duplicate value. Resource already exists.',
    })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired' })
  }

  // Unknown error
  logger.error('Unhandled error:', err)
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  })
}
