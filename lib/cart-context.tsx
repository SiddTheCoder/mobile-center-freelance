"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

import {
  addCartItem,
  readCartItems,
  subscribeToCartChanges,
  updateCartItemQuantity,
  writeCartItems,
} from "@/lib/cart-store"
import { type Product, type CartItem } from "@/lib/products"

type CartContextType = {
  cartItems: CartItem[]
  totalItems: number
  addToCart: (product: Product, quantity?: number) => void
  updateCart: (productId: string, quantity: number) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCartItems(readCartItems())
    }, 0)
    const unsubscribe = subscribeToCartChanges(setCartItems)

    return () => {
      window.clearTimeout(timer)
      unsubscribe()
    }
  }, [])

  const addToCart = (product: Product, quantity = 1) => {
    if (product.soldOut) return

    const newItems = addCartItem(readCartItems(), product, quantity)
    writeCartItems(newItems)
    setCartItems(newItems)
    setCartOpen(true)
  }

  const updateCart = (productId: string, quantity: number) => {
    const newItems = updateCartItemQuantity(readCartItems(), productId, quantity)
    writeCartItems(newItems)
    setCartItems(newItems)
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, totalItems, addToCart, updateCart, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
