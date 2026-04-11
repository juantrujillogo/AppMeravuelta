"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowLeft, CreditCard, Lock, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate transaction delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex flex-col items-center justify-center mb-6 shadow-highlight animate-in zoom-in">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">¡Compra Exitosa!</h1>
          <p className="text-gray-500 mb-8">
            Tu pedido ha sido procesado correctamente. Recibirás un correo electrónico con los detalles del envío pronto.
          </p>
          <button 
            onClick={() => router.push('/marketplace')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-md"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2 font-medium">
            <ArrowLeft className="w-5 h-5"/> Volver
          </button>
          <div className="text-xl font-extrabold text-purple-700 tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-green-500" /> Checkout Seguro
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Column */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalles de Facturación</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"/>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
              <input required type="email" placeholder="ejemplo@empresa.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"/>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección de Envío</label>
              <input required type="text" placeholder="Calle principal 123" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"/>
            </div>

            <div className="border-t border-gray-100 pt-6 mt-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-gray-400" /> Método de Pago
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Número de Tarjeta</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vencimiento</label>
                    <input required type="text" placeholder="MM/YY" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">CVC</label>
                    <input required type="text" placeholder="123" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"/>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(168,85,247,0.39)] transition-all flex justify-center items-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-5 h-5"/> Pagar de Forma Segura
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-100/50 p-8 rounded-3xl border border-gray-200 sticky top-10">
             <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de Cuenta</h2>
             
             <div className="space-y-4 mb-6">
                {/* Simulated Cart Item */}
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 bg-[url('https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm leading-tight">Producto Simulado (Demo)</p>
                    <p className="text-xs text-gray-500 mt-1">Cant: 1</p>
                  </div>
                  <p className="font-bold text-gray-900">$199.99</p>
                </div>
             </div>
             
             <div className="border-t border-gray-200 pt-4 space-y-3">
               <div className="flex justify-between text-gray-600 text-sm">
                 <span>Subtotal</span>
                 <span>$199.99</span>
               </div>
               <div className="flex justify-between text-gray-600 text-sm">
                 <span>Envío (Express)</span>
                 <span>$15.00</span>
               </div>
               <div className="flex justify-between text-gray-600 text-sm">
                 <span>Impuestos</span>
                 <span>$24.00</span>
               </div>
               <div className="flex justify-between text-gray-900 font-extrabold text-xl pt-4 border-t border-gray-200 mt-4">
                 <span>Total</span>
                 <span className="text-purple-600">$238.99</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
