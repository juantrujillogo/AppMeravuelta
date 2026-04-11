"use client";

import React from 'react';
import { User, Store, Shield, Bell, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Configuración de la Tienda</h1>
        <p className="text-gray-500 mt-1">Administra tus preferencias, notificaciones y opciones de seguridad.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 font-bold rounded-xl transition-colors">
            <Store className="w-5 h-5" /> Perfil de Tienda
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
            <User className="w-5 h-5" /> Cuenta Personal
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
            <Bell className="w-5 h-5" /> Notificaciones
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
            <Shield className="w-5 h-5" /> Privacidad y Seguridad
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Información Pública</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                  ED
                </div>
                <div>
                  <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors mb-2">
                    Cambiar Logotipo
                  </button>
                  <p className="text-xs text-gray-500">Recomendado: JPG, PNG o GIF cuadrado. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la Tienda</label>
                  <input type="text" defaultValue="ErgoOffice Tech" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Correo de Contacto</label>
                  <input type="email" defaultValue="ventas@ergooffice.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción de la Tienda</label>
                <textarea rows={4} defaultValue="Proveedores de mobilario ergonómico premium para oficinas modernas." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all resize-none"></textarea>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
              <button className="px-6 py-2.5 text-gray-600 font-bold hover:text-gray-900 transition-colors">
                Cancelar
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md transition-all active:scale-95">
                <Save className="w-4 h-4" /> Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
