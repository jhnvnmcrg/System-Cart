import { Link } from 'react-router-dom'
import { Code2 } from 'lucide-react'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export default function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (decorative) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden
                      bg-gradient-to-br from-brand-600 via-brand-700 to-brand-950
                      flex-col items-center justify-center p-12 text-white">

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
             }} />

        {/* Glow blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-sm text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Code2 size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SysCart</span>
          </div>

          <h2 className="text-3xl font-bold leading-tight mb-4">
            Buy & sell premium source code
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            A marketplace built for developers. Download production-ready code in seconds.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            {[
              { stat: '500+', label: 'Projects listed' },
              { stat: '$0 fees', label: 'On your first sale' },
              { stat: '100%', label: 'Secure downloads' },
              { stat: '24/7', label: 'Instant access' },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-white/10 rounded-xl p-4">
                <p className="text-xl font-bold">{stat}</p>
                <p className="text-sm text-white/60 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[var(--color-surface)]">
        {/* Mobile logo */}
        <Link to="/" className="flex lg:hidden items-center gap-2 font-bold text-xl mb-8">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white">
            <Code2 size={16} />
          </span>
          Sys<span className="text-brand-600">Cart</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">
              {title}
            </h1>
            <p className="text-muted mt-1">{subtitle}</p>
          </div>

          {children}

          <div className="mt-6 text-center text-sm text-muted">
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}
