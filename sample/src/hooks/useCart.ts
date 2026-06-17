import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  color?: string;
  storage?: string;
}

// Simple cart store using localStorage
const getStoredCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem("zolpa-cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

let cartListeners: Array<() => void> = [];
let cartItems: CartItem[] = getStoredCart();

const saveCart = (items: CartItem[]) => {
  cartItems = items;
  localStorage.setItem("zolpa-cart", JSON.stringify(items));
  cartListeners.forEach((l) => l());
};

export const useCart = () => {
  const [, forceUpdate] = useState(0);

  const rerender = useCallback(() => forceUpdate((n) => n + 1), []);

  // Subscribe/unsubscribe
  if (!cartListeners.includes(rerender)) {
    cartListeners.push(rerender);
  }

  const addItem = (item: Omit<CartItem, "quantity">) => {
    const existing = cartItems.find((i) => i.id === item.id);
    if (existing) {
      saveCart(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      saveCart([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    saveCart(cartItems.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    saveCart(
      cartItems.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return {
    items: cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};