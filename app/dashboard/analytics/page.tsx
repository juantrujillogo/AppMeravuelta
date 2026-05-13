"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, Sparkles } from 'lucide-react';

const salesData = [
  { name: 'Lun', ventas: 4000 },
  { name: 'Mar', ventas: 3000 },
  { name: 'Mie', ventas: 5000 },
  { name: 'Jue', ventas: 2780 },
  { name: 'Vie', ventas: 8890 },
  { name: 'Sab', ventas: 12390 },
  { name: 'Dom', ventas: 14490 },
];

const recoveredData = [
  { name: 'Sem 1', manual: 12, ai: 45 },
  { name: 'Sem 2', manual: 15, ai: 60 },
  { name: 'Sem 3', manual: 10, ai: 85 },
  { name: 'Sem 4', manual: 8, ai: 120 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Analíticas de Rendimiento</h1>
        <p className="text-gray-500 mt-1">Supervisa tus ventas y el impacto de la Inteligencia Artificial.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Ingresos Totales', value: '$45,231.89', change: '+20.1%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Nuevos Clientes', value: '+2,350', change: '+15.2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { title: 'Carritos Activos', value: '1,203', change: '+5.4%', icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-100' },
          { title: 'Recuperados por IA', value: '+340', change: '+85%', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">{stat.change}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" /> Ingresos de la Semana
            </h2>
            <select className="bg-gray-50 border-none text-sm font-medium text-gray-600 py-1.5 focus:ring-0 rounded-lg cursor-pointer outline-none">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
            </select>
          </div>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                />
                <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={4} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recovery Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" /> Carritos Recuperados (IA vs Manual)
            </h2>
          </div>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recoveredData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  cursor={{fill: '#f3f4f6'}}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="manual" name="Recuperación Manual" fill="#9ca3af" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="ai" name="Recuperación VentasIA" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
