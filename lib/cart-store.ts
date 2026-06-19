"use client"

import { CART_STORAGE_KEY } from "@/lib/platform"
import { type CartItem, type Product } from "@/lib/products"

export const CART_CHANGED_EVENT = "lotus-cart-change"

function isCartItem(value: unknown): value is CartItem {
  return (
    value !== null &&
    typeof value === "object" &&
    "id" in value &&
    "quantity" in value
  )
}

export function readCartItems(): CartItem[] {
  if (typeof window === "undefined") return []

  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : []
  } catch {
    return []
  }
}

export function writeCartItems(items: CartItem[]) {
  if (typeof window === "undefined") return

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent(CART_CHANGED_EVENT, { detail: items }))
}

export function addCartItem(
  items: CartItem[],
  product: Product,
  quantity = 1
) {
  const safeQuantity = Number.isFinite(quantity)
    ? Math.max(1, Math.floor(quantity))
    : 1
  const existing = items.find((item) => item.id === product.id)

  if (existing) {
    return items.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + safeQuantity }
        : item
    )
  }

  return [...items, { ...product, quantity: safeQuantity }]
}

export function updateCartItemQuantity(
  items: CartItem[],
  productId: string,
  quantity: number
) {
  return quantity <= 0
    ? items.filter((item) => item.id !== productId)
    : items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
}

export function subscribeToCartChanges(callback: (items: CartItem[]) => void) {
  if (typeof window === "undefined") return () => {}

  const onCartChange = (event: Event) => {
    if (event instanceof CustomEvent && Array.isArray(event.detail)) {
      callback(event.detail.filter(isCartItem))
      return
    }

    callback(readCartItems())
  }

  window.addEventListener(CART_CHANGED_EVENT, onCartChange)
  window.addEventListener("storage", onCartChange)

  return () => {
    window.removeEventListener(CART_CHANGED_EVENT, onCartChange)
    window.removeEventListener("storage", onCartChange)
  }
}
