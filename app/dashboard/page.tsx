"use client";

import React from 'react';
import { useCartSimulation } from '../../components/CartSimulationContext';
import { AlertCircle, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const { alertTriggered, resetSimulation } = useCartSimulation();

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Resumen de Actividad</h1>
          <p className="text-gray-500 mt-1">Monitorea el rendimiento de tu tienda de un vistazo.</p>
        </div>
      </header>

      {/* Cart Abandonment Alert */}
      {alertTriggered && (
        <div className="mb-8 relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg border border-amber-400 p-1 animate-in slide-in-from-top-4 fade-in duration-500">
          <div className="bg-white/10 backdrop-blur-sm px-6 py-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full shrink-0">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">¡Nueva oportunidad detectada!</h3>
                <p className="text-amber-50 font-medium mt-1">
                  Un carrito ha sido abandonado hace más de 60 segundos por un valor de <span className="font-bold underline decoration-amber-200 underline-offset-2">$199.99</span>. ¡Actúa rápido!
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <Link 
                href="/dashboard/automations" 
                className="flex-1 md:flex-none text-center bg-white text-orange-600 hover:bg-orange-50 font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                Ver Automatizaciones
              </Link>
              <button 
                onClick={resetSimulation}
                className="bg-black/20 hover:bg-black/30 text-white font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Ignorar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats mockup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Ventas Totales" value="$12,450" icon={DollarSign} trend="+14%" color="text-green-600" bg="bg-green-100" />
        <StatCard title="Visitas hoy" value="1,240" icon={Users} trend="+5%" color="text-blue-600" bg="bg-blue-100" />
        <StatCard title="Tasa de Conversión" value="3.2%" icon={Activity} trend="-1.2%" color="text-red-500" bg="bg-red-100" />
        <StatCard title="Carritos Recuperados" value="18" icon={TrendingUp} trend="+22%" color="text-purple-600" bg="bg-purple-100" />
      </div>

      {/* Basic Graph Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-96 flex flex-col justify-center items-center">
        <Activity className="h-16 w-16 text-gray-200 mb-4" />
        <h3 className="text-lg font-bold text-gray-400">Gráfico de Ventas Mensuales</h3>
        <p className="text-sm text-gray-400 mt-2 text-center max-w-sm">
          Integración con Recharts pendiente en la siguiente fase MVP.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color, bg }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${bg}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h4 className="text-2xl font-bold text-gray-900 mt-1">{value}</h4>
        <div className={`text-xs font-bold mt-1 ${color}`}>{trend} este mes</div>
      </div>
    </div>
  );
}
