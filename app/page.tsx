"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Store, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [hoveredRole, setHoveredRole] = useState<'buyer' | 'seller' | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background elegant effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4" />
          <span>El futuro del e-commerce B2B/B2C</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight mb-6">
          VentasIA
        </h1>
        <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
          Selecciona tu rol para explorar la plataforma. Esta demostración te permite ver el flujo desde ambas perspectivas.
        </p>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-6">
        {/* Buyer Card */}
        <button
          onClick={() => router.push('/marketplace')}
          onMouseEnter={() => setHoveredRole('buyer')}
          onMouseLeave={() => setHoveredRole(null)}
          className={`relative group bg-white/[0.03] border border-white/10 backdrop-blur-sm p-10 rounded-3xl text-left transition-all duration-500 overflow-hidden ${
            hoveredRole === 'seller' ? 'opacity-40 scale-[0.98]' : 'hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/40 hover:bg-white/[0.08]'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-500/20 to-purple-400/10 text-purple-400 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Soy Comprador</h2>
            <p className="text-slate-400 mb-10 flex-1 leading-relaxed">
              Explora productos increíbles y administra tus carritos. Mira cómo nuestra IA optimiza y recupera procesos inconclusos.
            </p>
            <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors text-lg">
              Ingresar al Marketplace <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </button>

        {/* Seller Card */}
        <button
          onClick={() => router.push('/dashboard')}
          onMouseEnter={() => setHoveredRole('seller')}
          onMouseLeave={() => setHoveredRole(null)}
          className={`relative group bg-white/[0.03] border border-white/10 backdrop-blur-sm p-10 rounded-3xl text-left transition-all duration-500 overflow-hidden ${
            hoveredRole === 'buyer' ? 'opacity-40 scale-[0.98]' : 'hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 hover:bg-white/[0.08]'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-blue-400/10 text-blue-400 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/5">
              <Store className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Soy Vendedor</h2>
            <p className="text-slate-400 mb-10 flex-1 leading-relaxed">
              Administra tu tienda, descubre nuevas formas de recuperar carritos usando IA y analiza en tiempo real tus estrategias.
            </p>
            <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors text-lg">
              Ir al Panel de Control <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="z-10 mt-20 text-slate-500 text-sm font-medium tracking-wide">
        SmarcartIA Demo MVP &copy; 2026
      </div>
    </div>
  );
}
