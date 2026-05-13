"use client";

import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCartSimulation } from './CartSimulationContext';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCartSimulation();
  const router = useRouter();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full sm:w-[400px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
        
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Tu Carrito</h2>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">
              {cartItems.reduce((acc, current) => acc + current.quantity, 0)} ítems
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
              <ShoppingBag className="w-16 h-16 text-gray-200" />
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-purple-600 font-bold hover:underline"
              >
                Seguir explorando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-xl border"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-1">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 mb-3 bg-gray-50 w-fit rounded-lg p-1 border">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md hover:bg-white hover:shadow-sm text-gray-500 transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-semibold text-gray-700 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md hover:bg-white hover:shadow-sm text-gray-500 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 p-1"
                        title="Eliminar del carrito"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Envío estimado</span>
                <span className="font-medium text-green-600">Calculado en Caja</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center bg-transparent">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setIsCartOpen(false);
                router.push('/marketplace/checkout');
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Ir al Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
