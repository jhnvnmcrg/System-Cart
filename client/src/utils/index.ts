import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/** Format price in USD */
export const formatPrice = (amount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

/** Format date */
export const formatDate = (dateStr: string): string =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateStr))

/** Truncate text */
export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? str.slice(0, maxLength) + '…' : str

/** Generate slug from string */
export const slugify = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** Get initials from name */
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

/** Check if URL is valid */
export const isValidUrl = (str: string): boolean => {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

/** Debounce function */
export const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
