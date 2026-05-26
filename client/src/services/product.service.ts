import api from './api'
import type { Product, ApiResponse, PaginatedResponse } from '@/types'

export interface ProductFilters {
  page?: number
  limit?: number
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  techStack?: string
  sort?: 'latest' | 'popular' | 'price_asc' | 'price_desc' | 'rating'
}

export const productService = {
  getAll: (filters: ProductFilters = {}) =>
    api.get<PaginatedResponse<Product>>('/products', { params: filters }),

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Product>>(`/products/${slug}`),

  create: (formData: FormData) =>
    api.post<ApiResponse<Product>>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  update: (id: string, formData: FormData) =>
    api.put<ApiResponse<Product>>(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  delete: (id: string) =>
    api.delete(`/products/${id}`),

  getMyProducts: () =>
    api.get<ApiResponse<Product[]>>('/products/seller/my-products'),
}
