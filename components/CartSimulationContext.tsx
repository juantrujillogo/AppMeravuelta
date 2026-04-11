"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartSimulationContextType {
  alertTriggered: boolean;
  startCartSimulation: () => void;
  resetSimulation: () => void;
}

const CartSimulationContext = createContext<CartSimulationContextType | undefined>(undefined);

export function CartSimulationProvider({ children }: { children: React.ReactNode }) {
  const [cartActive, setCartActive] = useState(false);
  const [triggerTime, setTriggerTime] = useState<number | null>(null);
  const [alertTriggered, setAlertTriggered] = useState(false);

  // Function to simulate user adding an item to the cart
  const startCartSimulation = () => {
    if (!cartActive) {
      setCartActive(true);
      // Wait exactly 60 seconds (60000 ms) from this moment to trigger the alert
      setTriggerTime(Date.now() + 60000);
      setAlertTriggered(false);
    }
  };

  const resetSimulation = () => {
    setCartActive(false);
    setTriggerTime(null);
    setAlertTriggered(false);
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
    <CartSimulationContext.Provider value={{ alertTriggered, startCartSimulation, resetSimulation }}>
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
