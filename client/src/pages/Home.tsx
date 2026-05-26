import { Link } from 'react-router-dom'
import { ArrowRight, Code2, ShieldCheck, Zap } from 'lucide-react'

const FEATURES = [
  { icon: Code2,      title: 'Quality Code',      desc: 'Every product is reviewed for clean, production-ready code.' },
  { icon: ShieldCheck, title: 'Secure Downloads', desc: 'Signed token system ensures only paying customers get access.' },
  { icon: Zap,        title: 'Instant Access',   desc: 'Download your purchase immediately after checkout.' },
]

export default function Home() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-surface-50 dark:from-brand-950/20 dark:via-surface-950 dark:to-surface-950" />
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="badge bg-brand-100 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 mb-4">
            🚀 Launch your next project faster
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-text)] mt-4 leading-tight">
            Premium source code,<br />
            <span className="text-brand-600">ready to ship.</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto">
            Buy and sell website templates, full-stack apps, dashboards, and more.
            Built by developers, for developers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/store" className="btn-primary gap-2 text-base px-7 py-3">
              Browse Products <ArrowRight size={18} />
            </Link>
            <Link to="/register?role=seller" className="btn-secondary text-base px-7 py-3">
              Start Selling
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Why SysCart?</h2>
          <p className="text-muted mt-2">Everything you need to buy or sell code, in one place.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950/50 flex items-center justify-center mb-4">
                <Icon size={20} className="text-brand-600" />
              </div>
              <h3 className="font-semibold text-[var(--color-text)] mb-1">{title}</h3>
              <p className="text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
