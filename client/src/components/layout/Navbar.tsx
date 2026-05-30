import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, Code2, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useCartStore } from '@/store/cartStore'
import { cn, getInitials } from '@/utils'
import toast from 'react-hot-toast'

const NAV_LINKS = [
  { to: '/store', label: 'Browse' },
  { to: '/store?category=Website', label: 'Websites' },
  { to: '/store?category=Dashboard', label: 'Dashboards' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate    = useNavigate()

  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCartStore()

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    setDropdownOpen(false)
    toast.success('Signed out')
    navigate('/')
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

          {/* Desktop nav links */}
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

          {/* Right actions */}
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
              /* ── User dropdown ── */
              <div className="hidden md:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className={cn(
                    'flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-all duration-200',
                    dropdownOpen
                      ? 'border-brand-400 bg-brand-50 dark:bg-brand-950/30'
                      : 'border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-subtle)]'
                  )}
                >
                  {/* Avatar */}
                  <div className="w-7 h-7 rounded-lg bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-lg" />
                      : getInitials(user.name)}
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text)] max-w-[120px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className={cn('text-muted transition-transform duration-200', dropdownOpen && 'rotate-180')}
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 card shadow-lg py-1 animate-fade-in">
                    <div className="px-3 py-2 border-b border-[var(--color-border)]">
                      <p className="text-sm font-semibold text-[var(--color-text)] truncate">{user.name}</p>
                      <p className="text-xs text-muted truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-[var(--color-text)]
                                 hover:bg-[var(--color-surface-subtle)] transition-colors"
                    >
                      <LayoutDashboard size={15} className="text-muted" />
                      Dashboard
                    </Link>

                    <div className="border-t border-[var(--color-border)] mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500
                                   hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      >
                        <LogOut size={15} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login"    className="btn-ghost text-sm">Sign in</Link>
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
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary text-sm justify-start gap-2"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-500
                             border border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20 transition-colors"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    onClick={() => setMenuOpen(false)} className="btn-secondary text-sm">Sign in</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
