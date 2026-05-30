import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ShoppingBag, Code2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/components/shared/AuthLayout'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { cn } from '@/utils'

type Role = 'buyer' | 'seller'

interface FormState {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: Role
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter',  test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number',            test: (p: string) => /[0-9]/.test(p) },
]

export default function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { register, isLoading } = useAuth()

  const defaultRole = (searchParams.get('role') as Role) || 'buyer'

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)

  // ── Validation ─────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {}

    if (!form.name.trim())            e.name     = 'Name is required'
    else if (form.name.length < 2)    e.name     = 'Name must be at least 2 characters'

    if (!form.email)                  e.email    = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                      e.email    = 'Enter a valid email address'

    if (!form.password)               e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    else if (!/[A-Z]/.test(form.password)) e.password = 'Must contain an uppercase letter'
    else if (!/[0-9]/.test(form.password)) e.password = 'Must contain a number'

    if (!form.confirmPassword)        e.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword)
                                      e.confirmPassword = 'Passwords do not match'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await register(form.name, form.email, form.password, form.role)
      toast.success('Account created! Welcome to SysCart 🎉')
      navigate('/', { replace: true })
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Registration failed. Please try again.'
      toast.error(msg)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join SysCart and start buying or selling code today"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-semibold hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>

        {/* ── Role Selector ── */}
        <div>
          <p className="text-sm font-medium text-[var(--color-text)] mb-2">I want to…</p>
          <div className="grid grid-cols-2 gap-3">
            {([
              { value: 'buyer',  label: 'Buy Projects',  icon: ShoppingBag, desc: 'Download & use code' },
              { value: 'seller', label: 'Sell Projects', icon: Code2,       desc: 'List & earn money'  },
            ] as const).map(({ value, label, icon: Icon, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm((p) => ({ ...p, role: value }))}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 text-center transition-all duration-200',
                  form.role === value
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300'
                    : 'border-[var(--color-border)] hover:border-brand-300 text-[var(--color-text-muted)]'
                )}
              >
                <Icon size={20} />
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-xs opacity-70">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <Input
          label="Full name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Alex Johnson"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          leftIcon={<User size={16} />}
          autoFocus
        />

        {/* Email */}
        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          leftIcon={<Mail size={16} />}
        />

        {/* Password */}
        <div>
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            leftIcon={<Lock size={16} />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                className="hover:text-[var(--color-text)] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {/* Password strength indicators */}
          {form.password && (
            <div className="mt-2 flex flex-wrap gap-2">
              {PASSWORD_RULES.map(({ label, test }) => (
                <span
                  key={label}
                  className={cn(
                    'text-[11px] px-2 py-0.5 rounded-full transition-colors',
                    test(form.password)
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-[var(--color-surface-subtle)] text-muted'
                  )}
                >
                  {test(form.password) ? '✓' : '○'} {label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm password"
          name="confirmPassword"
          type={showConfirm ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={-1}
              className="hover:text-[var(--color-text)] transition-colors"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        {/* Terms */}
        <p className="text-xs text-muted text-center">
          By creating an account you agree to our{' '}
          <a href="#" className="text-brand-600 hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-brand-600 hover:underline">Privacy Policy</a>.
        </p>

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isLoading}
        >
          Create Account
        </Button>
      </form>
    </AuthLayout>
  )
}
