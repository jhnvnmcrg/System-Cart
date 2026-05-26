import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Code2, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/utils'

const NAV_LINKS = [
  { to: '/store', label: 'Browse' },
  { to: '/store?category=Website', label: 'Websites' },
  { to: '/store?category=Dashboard', label: 'Dashboards' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const { totalItems } = useCartStore()

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600 text-white">
              <Code2 size={18} />
            </span>
            <span className="text-[var(--color-text)]">
              Sys<span className="text-brand-600">Cart</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn('btn-ghost text-sm', isActive && 'text-brand-600 bg-brand-50 dark:bg-brand-950/30')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link to="/cart" className="relative btn-ghost p-2">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold
                                 bg-brand-600 text-white rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/dashboard" className="btn-ghost py-1.5 px-3 text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-ghost p-2 text-muted">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm">Sign in</Link>
                <Link to="/register" className="btn-primary text-sm py-2">Get Started</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden btn-ghost p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] px-4 pb-4 pt-2 space-y-1 bg-[var(--color-surface)]">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn('block px-3 py-2 rounded-lg text-sm font-medium',
                  isActive
                    ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/30'
                    : 'text-[var(--color-text)]')
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-[var(--color-border)] flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="btn-secondary text-sm justify-start">
                  <User size={16} /> Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-ghost text-sm justify-start text-red-500">
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary text-sm">Sign in</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
