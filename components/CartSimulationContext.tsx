"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../lib/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartSimulationContextType {
  alertTriggered: boolean;
  startCartSimulation: () => void;
  resetSimulation: () => void;
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  cartTotal: number;
}

const CartSimulationContext = createContext<CartSimulationContextType | undefined>(undefined);

export function CartSimulationProvider({ children }: { children: React.ReactNode }) {
  const [cartActive, setCartActive] = useState(false);
  const [triggerTime, setTriggerTime] = useState<number | null>(null);
  const [alertTriggered, setAlertTriggered] = useState(false);

  // New Cart states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to simulate user adding an item to the cart
  const startCartSimulation = () => {
    if (!cartActive) {
      setCartActive(true);
      // Wait exactly 60 seconds (60000 ms) from this moment to trigger the alert
      setTriggerTime(Date.now() + 60000);
      setAlertTriggered(false);
    }
  };

  const addToCart = (product: Product) => {
    startCartSimulation(); // Start simulation on first addition
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open the drawer automatically
  };

  const removeFromCart = (productId: number | string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const resetSimulation = () => {
    setCartActive(false);
    setTriggerTime(null);
    setAlertTriggered(false);
    setCartItems([]);
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (!cartActive || !triggerTime) return;

    // Check every second if 60s limit has passed
    const intervalId = setInterval(() => {
      if (Date.now() >= triggerTime && !alertTriggered) {
        setAlertTriggered(true);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cartActive, triggerTime, alertTriggered]);

  return (
    <CartSimulationContext.Provider value={{ 
      alertTriggered, 
      startCartSimulation, 
      resetSimulation,
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartTotal 
    }}>
      {children}
    </CartSimulationContext.Provider>
  );
}

export function useCartSimulation() {
  const context = useContext(CartSimulationContext);
  if (context === undefined) {
    throw new Error('useCartSimulation must be used within a CartSimulationProvider');
  }
  return context;
}
