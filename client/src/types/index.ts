// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  _id: string
  name: string
  email: string
  role: 'buyer' | 'seller' | 'admin'
  avatar?: string
  bio?: string
  stripeAccountId?: string
  purchasedProducts: string[]
  createdAt: string
  updatedAt: string
}

// ─── Product ──────────────────────────────────────────────────────────────────
export type ProductCategory =
  | 'Website'
  | 'Mobile App'
  | 'Dashboard'
  | 'Landing Page'
  | 'E-Commerce'
  | 'Plugin'
  | 'API'
  | 'Full Stack'
  | 'Other'

export type ProductStatus = 'draft' | 'published' | 'suspended'

export interface Product {
  _id: string
  title: string
  slug: string
  description: string
  sellerId: string | User
  price: number
  discountPrice?: number
  category: ProductCategory
  tags: string[]
  techStack: string[]
  previewImages: string[]
  previewUrl?: string
  version: string
  changelog?: string
  downloadCount: number
  salesCount: number
  rating: { average: number; count: number }
  status: ProductStatus
  createdAt: string
  updatedAt: string
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus = 'pending' | 'paid' | 'refunded' | 'failed'

export interface OrderItem {
  productId: string | Product
  price: number
  sellerId: string
}

export interface DownloadToken {
  productId: string
  token: string
  expiresAt: string
  usedCount: number
}

export interface Order {
  _id: string
  buyerId: string | User
  items: OrderItem[]
  totalAmount: number
  stripePaymentIntentId?: string
  stripeSessionId?: string
  status: OrderStatus
  downloadTokens: DownloadToken[]
  createdAt: string
}

// ─── Review ───────────────────────────────────────────────────────────────────
export interface Review {
  _id: string
  productId: string
  userId: string | User
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  verifiedPurchase: boolean
  createdAt: string
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product
  addedAt: string
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthTokens {
  accessToken: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role?: 'buyer' | 'seller'
}
