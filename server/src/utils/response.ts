import type { Response } from 'express'

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
) => {
  res.status(statusCode).json({ success: true, message, data })
}

export const sendError = (
  res: Response,
  message = 'Something went wrong',
  statusCode = 500,
  errors?: unknown
) => {
  res.status(statusCode).json({ success: false, message, errors })
}

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number
) => {
  res.status(200).json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  })
}
