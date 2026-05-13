"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, Clock, CreditCard, Settings, CheckCircle2, Truck, Plus, Save, Lock, User as UserIcon } from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: "ORD-94302-XY",
    date: "14 Abr 2026",
    total: 349.99,
    status: "delivered",
    statusText: "Entregado",
    trackingNo: "1Z9999999999999999",
    items: [
      {
        name: "Escritorio Elevable Automático",
        qty: 1,
        price: 349.99,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=200&q=80"
      }
    ]
  },
  {
    id: "ORD-89110-ZA",
    date: "10 Abr 2026",
    total: 289.98,
    status: "in_transit",
    statusText: "En camino",
    trackingNo: "TRK-8820-22",
    items: [
      {
        name: "Teclado Mecánico Inalámbrico",
        qty: 1,
        price: 89.99,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Silla de Oficina Ergonómica Premium",
        qty: 1,
        price: 199.99,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=200&q=80"
      }
    ]
  }
];

export default function BuyerProfile() {
  const [activeTab, setActiveTab] = useState<'orders' | 'payment' | 'settings'>('orders');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-purple-700 text-white pb-24 pt-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/marketplace" className="inline-flex items-center text-purple-200 hover:text-white transition-colors mb-6 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver de compras
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-purple-500 rounded-full border-4 border-purple-400 flex items-center justify-center text-2xl font-extrabold shadow-lg">
              JA
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Juan Administrador</h1>
              <p className="text-purple-200 font-medium">Comprador Premium • Miembro desde 2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full -mt-16 mb-20">
        
        {/* Profile Tabs */}
        <div className="flex gap-2 overflow-x-auto mb-8 pb-2 scrollbar-none">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-white text-purple-700 shadow-md border-b-2 border-purple-600' : 'bg-white/60 text-gray-500 hover:bg-white hover:text-gray-800 border-b-2 border-transparent'
            }`}
          >
            <Package className="w-5 h-5" />
            Mis Compras
          </button>
          <button 
            onClick={() => setActiveTab('payment')}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'payment' ? 'bg-white text-purple-700 shadow-md border-b-2 border-purple-600' : 'bg-white/60 text-gray-500 hover:bg-white hover:text-gray-800 border-b-2 border-transparent'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Métodos de Pago
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-white text-purple-700 shadow-md border-b-2 border-purple-600' : 'bg-white/60 text-gray-500 hover:bg-white hover:text-gray-800 border-b-2 border-transparent'
            }`}
          >
            <Settings className="w-5 h-5" />
            Configuración
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="space-y-6">
          
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <Clock className="w-6 h-6 text-purple-600" />
                Historial de Pedidos Recientes
              </h2>

              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-xs text-gray-500 font-medium block">PEDIDO REALIZADO</span>
                        <span className="font-bold text-gray-800">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium block">TOTAL</span>
                        <span className="font-bold text-gray-800">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col sm:items-end">
                      <span className="text-xs text-gray-500 font-medium block">PEDIDO # {order.id}</span>
                      <a href="#" className="font-bold text-purple-600 hover:text-purple-800 text-sm" onClick={(e) => e.preventDefault()}>Ver recibo</a>
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      {order.status === 'delivered' ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Truck className="w-6 h-6 text-blue-500" />
                      )}
                      <h3 className={`font-extrabold text-lg ${order.status === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                        {order.statusText}
                      </h3>
                      <span className="ml-auto text-sm text-gray-500">
                        Rastreo: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">{order.trackingNo}</span>
                      </span>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4 items-center">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-100" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{item.name}</h4>
                            <p className="text-gray-500 text-sm mb-2">Cantidad: {item.qty} • ${item.price.toFixed(2)} c/u</p>
                            
                            <div className="flex gap-2">
                              <button className="text-sm font-bold bg-purple-50 text-purple-600 px-4 py-1.5 rounded-lg hover:bg-purple-100 transition-colors">
                                Volver a comprar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* PAYMENT TAB */}
          {activeTab === 'payment' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-600" /> Métodos de Pago
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Saved Card */}
                <div className="border-2 border-purple-100 bg-purple-50/50 rounded-xl p-5 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6 object-contain" />
                    <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">Predeterminado</span>
                  </div>
                  <div className="text-lg font-mono text-gray-700 font-bold tracking-widest mb-1">
                    •••• •••• •••• 4242
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                    <span>Expira 12/28</span>
                    <button className="text-red-500 hover:text-red-700 transition-colors">Eliminar</button>
                  </div>
                </div>

                {/* Add Card Button */}
                <button className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50/50 transition-all group">
                  <div className="bg-gray-100 group-hover:bg-purple-100 p-3 rounded-full mb-3 transition-colors">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Agregar nueva tarjeta</span>
                </button>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-purple-600" /> Detalles de Cuenta
              </h2>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Configuración guardada (Simulación)'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                    <input type="text" defaultValue="Juan Administrador" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
                    <input type="email" defaultValue="juan.admin@empresa.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium" />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gray-400" /> Seguridad
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nueva Contraseña</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Confirmar Contraseña</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95">
                    <Save className="w-5 h-5" /> Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
