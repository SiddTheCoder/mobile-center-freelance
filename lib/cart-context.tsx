"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

import { CART_STORAGE_KEY } from "@/lib/platform"
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

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (saved) {
      try {
        setCartItems(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const addToCart = (product: Product, quantity = 1) => {
    if (product.soldOut) return
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === product.id)
      let newItems = [...prevItems]
      if (existingIndex > -1) {
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity
        }
      } else {
        newItems.push({ ...product, quantity })
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
      return newItems
    })
    setCartOpen(true)
  }

  const updateCart = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity }
        }
        return item
      }).filter((item) => item.quantity > 0)
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
      return newItems
    })
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
