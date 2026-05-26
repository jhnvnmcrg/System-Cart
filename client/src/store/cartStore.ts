import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number

  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  hasItem: (productId: string) => boolean
}

const calcTotals = (items: CartItem[]) => ({
  totalItems: items.length,
  totalPrice: items.reduce((sum, i) => {
    const price = i.product.discountPrice ?? i.product.price
    return sum + price
  }, 0),
})

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product) => {
        if (get().hasItem(product._id)) return
        const newItems = [...get().items, { product, addedAt: new Date().toISOString() }]
        set({ items: newItems, ...calcTotals(newItems) })
      },

      removeItem: (productId) => {
        const newItems = get().items.filter((i) => i.product._id !== productId)
        set({ items: newItems, ...calcTotals(newItems) })
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

      hasItem: (productId) => get().items.some((i) => i.product._id === productId),
    }),
    {
      name: 'syscart-cart',
    }
  )
)
