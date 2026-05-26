import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-7xl font-bold text-brand-600 font-mono">404</p>
      <h1 className="mt-4 text-2xl font-bold text-[var(--color-text)]">Page not found</h1>
      <p className="mt-2 text-muted">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  )
}
