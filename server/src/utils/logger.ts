import winston from 'winston'

const { combine, timestamp, colorize, printf, json } = winston.format

const devFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ''
  return `${timestamp} [${level}]: ${message}${metaStr}`
})

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'HH:mm:ss' }),
        process.env.NODE_ENV === 'production' ? json() : devFormat
      ),
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
  ],
})

export default logger
