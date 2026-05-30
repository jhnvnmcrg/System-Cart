import nodemailer from 'nodemailer'
import logger from '../utils/logger'

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST   || 'smtp.sendgrid.net',
  port:   parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// ─── Verify connection on startup (non-blocking) ───────────────
transporter.verify().then(() => {
  logger.info('✅ Email transporter ready')
}).catch((err) => {
  logger.warn('⚠️  Email transporter not ready:', err.message)
})

// ─── Base HTML wrapper ─────────────────────────────────────────
const emailBase = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body  { font-family: 'Sora', Arial, sans-serif; background: #f8f9fc; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 16px;
            border: 1px solid #e5e7eb; overflow: hidden; }
    .head { background: #6270f1; padding: 32px 40px; text-align: center; }
    .head h1 { color: #fff; margin: 0; font-size: 22px; letter-spacing: -0.5px; }
    .body { padding: 36px 40px; color: #0f1117; line-height: 1.7; }
    .btn  { display: inline-block; background: #6270f1; color: #fff !important;
            padding: 12px 28px; border-radius: 10px; text-decoration: none;
            font-weight: 600; margin: 20px 0; }
    .foot { padding: 20px 40px; background: #f8f9fc; border-top: 1px solid #e5e7eb;
            text-align: center; color: #9ca3af; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="head"><h1>SysCart</h1></div>
    <div class="body">${content}</div>
    <div class="foot">© ${new Date().getFullYear()} SysCart. All rights reserved.</div>
  </div>
</body>
</html>
`

interface SendMailOptions {
  to: string
  subject: string
  html: string
}

const sendMail = async (opts: SendMailOptions) => {
  try {
    await transporter.sendMail({
      from: `"SysCart" <${process.env.EMAIL_FROM || 'noreply@syscart.dev'}>`,
      ...opts,
    })
    logger.info(`📧 Email sent to ${opts.to}: ${opts.subject}`)
  } catch (err) {
    logger.error('❌ Failed to send email:', err)
    // Don't throw — email failure shouldn't break the request
  }
}

// ─── Email Templates ───────────────────────────────────────────

export const sendWelcomeEmail = (to: string, name: string) =>
  sendMail({
    to,
    subject: 'Welcome to SysCart 🎉',
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Welcome to <strong>SysCart</strong> — the premium source code marketplace built for developers.</p>
      <p>You can now browse and purchase projects, or list your own for sale.</p>
      <a href="${process.env.CLIENT_URL}/store" class="btn">Browse Products</a>
      <p>Happy building,<br/>The SysCart Team</p>
    `),
  })

export const sendPasswordResetEmail = (to: string, name: string, resetUrl: string) =>
  sendMail({
    to,
    subject: 'Reset your SysCart password',
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below — this link expires in <strong>1 hour</strong>.</p>
      <a href="${resetUrl}" class="btn">Reset Password</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
      <p>The SysCart Team</p>
    `),
  })

export const sendOrderConfirmationEmail = (
  to: string,
  name: string,
  orderId: string,
  items: { title: string; price: number }[]
) =>
  sendMail({
    to,
    subject: 'Your SysCart order is confirmed ✅',
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your payment was successful! Here's your order summary:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        ${items
          .map(
            (i) => `
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${i.title}</td>
            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">
              $${i.price.toFixed(2)}
            </td>
          </tr>`
          )
          .join('')}
      </table>
      <a href="${process.env.CLIENT_URL}/dashboard/orders/${orderId}" class="btn">View & Download</a>
      <p>The SysCart Team</p>
    `),
  })
