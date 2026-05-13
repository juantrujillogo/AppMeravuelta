"use client";

import React, { useState } from 'react';
import { Settings, Plus, Zap, Mail, MessageSquare, Clock, X, Save } from 'lucide-react';

export default function AutomationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [automations, setAutomations] = useState([
    {
      id: 1,
      title: 'Recuperación Rápida',
      description: 'Envía un recordatorio amistoso los 30 minutos de abandonado el carrito.',
      type: 'Carrito Abandonado',
      channel: 'Email',
      status: true,
      stats: '12% Conversión',
    },
    {
      id: 2,
      title: 'Recuperación Tardía',
      description: 'Ofrece un 10% de descuento a las 24 horas del abandono.',
      type: 'Carrito Abandonado',
      channel: 'WhatsApp',
      status: false,
      stats: '5% Conversión',
    },
    {
      id: 3,
      title: 'Bienvenida',
      description: 'Cupón de bienvenida inmediato para nuevos registros.',
      type: 'Onboarding',
      channel: 'Ambos',
      status: true,
      stats: '45% Apertura',
    }
  ]);

  const [newTitle, setNewTitle] = useState('Recuperación Personalizada');
  const [newChannel, setNewChannel] = useState('📱 WhatsApp');
  const [newDiscount, setNewDiscount] = useState('15');
  const [newPrompt, setNewPrompt] = useState('¡Hola! Noté que dejaste algunos artículos en tu carrito. Como nos encantaría verte disfrutar de ellos, aquí tienes un regalo especial...');

  const handleSaveAutomation = () => {
    const newAutomation = {
      id: automations.length + 1,
      title: newTitle,
      description: newPrompt.substring(0, 50) + '...',
      type: 'Personalizado',
      channel: newChannel.includes('WhatsApp') ? 'WhatsApp' : newChannel.includes('Correo') ? 'Email' : 'Ambos',
      status: true,
      stats: '0% Conversión',
    };
    setAutomations([newAutomation, ...automations]);
    setIsModalOpen(false);
  };

  const toggleStatus = (id: number) => {
    setAutomations(automations.map(a => a.id === id ? { ...a, status: !a.status } : a));
  };

  return (
    <div className="p-8 pb-32">
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Automatizaciones Inteligentes</h1>
          <p className="text-gray-500 mt-2 text-lg">Configura flujos de IA para recuperar ventas automáticamente.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Nueva Automatización
        </button>
      </header>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {automations.map((campaign) => (
          <div key={campaign.id} className={`bg-white rounded-2xl shadow-sm border ${campaign.status ? 'border-purple-200 shadow-purple-50' : 'border-gray-200'} p-6 transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${campaign.status ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{campaign.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {campaign.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                      {campaign.channel === 'Email' ? <Mail className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                      {campaign.channel}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <button 
                onClick={() => toggleStatus(campaign.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${campaign.status ? 'bg-purple-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${campaign.status ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">{campaign.description}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                <Clock className="h-4 w-4" /> {campaign.stats}
              </span>
              <button className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Automation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Crear Nueva Automatización</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 mt-1">Canal de envío</label>
                <select 
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option>📱 WhatsApp (Recomendado)</option>
                  <option>✉️ Correo Electrónico</option>
                  <option>🚀 Ambos canales</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 mt-1">Descuento Ofrecido (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Ej: 15"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                    className="w-full border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-bold">%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">La IA calculará la rentabilidad en base a este margen máximo.</p>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 mt-1">Mensaje del Asistente (Prompt IA)</label>
                <textarea 
                  rows={4}
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                  placeholder="¡Hola! Noté que dejaste algunos artículos en tu carrito. Como nos encantaría verte disfrutar de ellos, aquí tienes un regalo especial..."
                ></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveAutomation}
                className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm"
              >
                <Save className="h-4 w-4" />
                Guardar y Activar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
