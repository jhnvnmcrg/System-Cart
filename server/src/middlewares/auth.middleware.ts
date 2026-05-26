import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import { UnauthorizedError } from '../utils/errors'

export interface AuthRequest extends Request {
  user?: IUser
}

interface JwtPayload {
  userId: string
  role: string
}

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.accessToken

    if (!token) throw new UnauthorizedError('No token provided')

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload
    const user = await User.findById(decoded.userId)
    if (!user) throw new UnauthorizedError('User not found')

    req.user = user
    next()
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired token'))
  }
}

export const authorize = (...roles: string[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new UnauthorizedError('Insufficient permissions'))
    }
    next()
  }
