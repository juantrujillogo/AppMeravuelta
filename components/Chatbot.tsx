"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useCartSimulation } from './CartSimulationContext';

type Message = { sender: 'bot' | 'user'; text: string };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '¡Hola! Soy tu asistente inteligente local. Estoy aquí para responder cualquier pregunta sobre nuestros productos, envíos, o garantías.' }
  ]);
  const [inputText, setInputText] = useState("");
  const [hasRecovered, setHasRecovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { alertTriggered } = useCartSimulation();

  // Autoscroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Cart Recovery Logic
  useEffect(() => {
    if (alertTriggered && !hasRecovered) {
      setIsOpen(true);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: '👋 ¡Veo que tienes artículos en tu carrito que podrían agotarse! Si finalizas tu compra en los próximos 10 minutos, te regalamos un 10% de descuento usando el código RECUPERA10. ¡No dejes pasar esta oportunidad!' 
      }]);
      setHasRecovered(true);
    }
  }, [alertTriggered, hasRecovered]);

  const generateLocalResponse = (message: string): string => {
    const text = message.toLowerCase();
    
    if (text.includes('silla') || text.includes('ergonomica') || text.includes('ergonómica')) {
      return "Nuestra Silla Ergonómica Premium soporta hasta 150kg, tiene malla transpirable importada y cuenta con ajuste lumbar 3D. ¿Te gustaría saber algo en particular sobre ella?";
    }
    if (text.includes('monitor') || text.includes('pantalla') || text.includes('4k')) {
      return "El monitor UltraWide 34\" es perfecto para productividad. Tiene un panel IPS con colores sRGB 99% y tasa de refresco ultra fluida de 144Hz.";
    }
    if (text.includes('teclado') || text.includes('mecanico') || text.includes('mecánico')) {
      return "El Teclado Mecánico Inalámbrico usa switches silenciosos y puede conectarse por Bluetooth 5.0 o conector USB. ¡Su batería dura meses!";
    }
    if (text.includes('escritorio') || text.includes('elevable')) {
      return "El escritorio automático tiene motores duales y soporta hasta 120kg. Puedes preconfigurar 4 alturas distintas en la memoria.";
    }
    if (text.includes('precio') || text.includes('costo') || text.includes('vale')) {
      return "Nuestros precios varían por producto, pero siempre puedes revisar el detalle exacto e impuestos al hacer clic sobre cualquier ítem o yendo a la pasarela de pago segura.";
    }
    if (text.includes('descuento') || text.includes('cupon') || text.includes('promocion')) {
      return "Los descuentos activos aplican directamente. Sin embargo, tenemos una promoción si abandonas el carrito... ¡Ups, no debí decir eso! (Prueba finalizando tu compra usando el código RECUPERA10).";
    }
    if (text.includes('envio') || text.includes('envío') || text.includes('tiempo')) {
      return "Tenemos opciones de envío Flex (24-48 horas) para la mayoría de los accesorios, y envíos regulares (5-7 días) para mobiliario pesado como escritorios.";
    }
    if (text.includes('garantia') || text.includes('garantía') || text.includes('devolver')) {
      return "Estás protegido. Todos los productos cuentan con 1 año de garantía extendida por la tienda, y 30 días de satisfacción total (devolución sin preguntas).";
    }
    if (text.includes('gracias') || text.includes('excelente') || text.includes('ok')) {
      return "¡De nada! Aquí sigo a la orden.";
    }
    if (text.includes('hola') || text.includes('buenas')) {
      return "¡Hola de nuevo! ¿Te ayudo a buscar algún recurso para tu oficina?";
    }
    
    // Default fallback
    return "¡Qué interesante! Dado que soy una demo local, solo conozco sobre sillas, monitores, escritorios, teclados, envíos y garantías. ¿Qué te gustaría saber más a fondo?";
  };

  const handleSend = () => {
    if(!inputText.trim()) return;
    
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText("");

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse = generateLocalResponse(userMsg);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 hover:scale-110 transition-all duration-300 z-50 group flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
      >
        {alertTriggered && !hasRecovered && (
           <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full animate-ping"></span>
        )}
        <MessageCircle className="w-7 h-7 group-hover:hidden" />
        <Bot className="w-7 h-7 hidden group-hover:block animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white/95 backdrop-blur-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-3xl flex flex-col z-50 overflow-hidden font-sans ring-1 ring-black/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-4 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">Asistente Info Local</h3>
            <p className="text-xs text-purple-100 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]"></span> Integrado Activo
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors active:scale-90">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3.5 text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-purple-600 text-white rounded-3xl rounded-tr-sm shadow-md' 
                : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-3xl rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/80 border-t border-gray-100 shrink-0 backdrop-blur-md">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregunta precios, garantía, productos..."
            className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-800 font-medium"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="bg-purple-600 p-3 rounded-full text-white hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 transition-colors shadow-md active:scale-95 flex items-center justify-center h-11 w-11"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
