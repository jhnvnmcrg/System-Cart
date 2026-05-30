import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import User from '../models/User'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  refreshTokenCookieOptions,
} from '../utils/jwt'
import { sendSuccess, sendError } from '../utils/response'
import { AppError, UnauthorizedError, ValidationError } from '../utils/errors'
import { sendWelcomeEmail } from '../services/email.service'
import type { AuthRequest } from '../middlewares/auth.middleware'

// ─── Helpers ──────────────────────────────────────────────────
const issueTokens = (userId: string, role: string) => ({
  accessToken:  signAccessToken({ userId, role }),
  refreshToken: signRefreshToken({ userId, role }),
})

// ─── Register ─────────────────────────────────────────────────
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 422, errors.array())
    }

    const { name, email, password, role = 'buyer' } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return sendError(res, 'An account with this email already exists', 409)
    }

    // passwordHash field — pre-save hook will bcrypt it
    const user = await User.create({ name, email, passwordHash: password, role })

    const { accessToken, refreshToken } = issueTokens(String(user._id), user.role)

    // Store refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)

    // Fire welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name)

    sendSuccess(
      res,
      { user, accessToken },
      'Account created successfully',
      201
    )
  } catch (err) {
    next(err)
  }
}

// ─── Login ────────────────────────────────────────────────────
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 422, errors.array())
    }

    const { email, password } = req.body

    // Include passwordHash (normally excluded by select: false)
    const user = await User.findOne({ email }).select('+passwordHash')
    if (!user) {
      return sendError(res, 'Invalid email or password', 401)
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return sendError(res, 'Invalid email or password', 401)
    }

    const { accessToken, refreshToken } = issueTokens(String(user._id), user.role)

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)

    // Strip passwordHash before sending
    const userObj = user.toJSON()

    sendSuccess(res, { user: userObj, accessToken }, 'Logged in successfully')
  } catch (err) {
    next(err)
  }
}

// ─── Logout ───────────────────────────────────────────────────
export const logout = (_req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    path: '/api/auth',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
  sendSuccess(res, null, 'Logged out successfully')
}

// ─── Refresh Token ────────────────────────────────────────────
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.refreshToken
    if (!token) {
      return sendError(res, 'No refresh token', 401)
    }

    let payload
    try {
      payload = verifyRefreshToken(token)
    } catch {
      return sendError(res, 'Invalid or expired refresh token', 401)
    }

    const user = await User.findById(payload.userId)
    if (!user) {
      return sendError(res, 'User not found', 401)
    }

    const { accessToken, refreshToken: newRefreshToken } = issueTokens(
      String(user._id),
      user.role
    )

    // Rotate refresh token
    res.cookie('refreshToken', newRefreshToken, refreshTokenCookieOptions)

    sendSuccess(res, { accessToken }, 'Token refreshed')
  } catch (err) {
    next(err)
  }
}

// ─── Get Current User ─────────────────────────────────────────
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user!._id)
    if (!user) return sendError(res, 'User not found', 404)
    sendSuccess(res, user)
  } catch (err) {
    next(err)
  }
}

// ─── Forgot Password ──────────────────────────────────────────
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    if (!email) return sendError(res, 'Email is required', 400)

    // Always return success to prevent user enumeration
    const user = await User.findOne({ email })
    if (user) {
      // TODO Phase 8: generate reset token, save to DB, send email
    }

    sendSuccess(res, null, 'If that email exists, a reset link has been sent.')
  } catch (err) {
    next(err)
  }
}
