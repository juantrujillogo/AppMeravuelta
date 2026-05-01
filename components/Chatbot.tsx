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

  // Desplazamiento automático hacia abajo (Autoscroll)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Lógica de Recuperación de Carrito
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

  const handleSend = async () => {
    if(!inputText.trim()) return;
    
    const userMsg = inputText.trim();
    // Agregamos el mensaje del usuario inmediatamente
    const newMessages: Message[] = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMessages);
    setInputText("");

    // Agregamos un mensaje temporal de "escribiendo..." (opcional pero recomendado)
    setMessages(prev => [...prev, { sender: 'bot', text: 'Escribiendo...' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();

      if (response.ok) {
        // Reemplazar el mensaje de "Escribiendo..." con la respuesta real
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'bot', text: data.reply };
          return updated;
        });
      } else {
        // En caso de error (por ejemplo si falta la llave)
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'bot', text: 'Error: ' + (data.error || 'Algo salió mal.') };
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: 'bot', text: 'Error de conexión. Asegúrate de tener el servidor corriendo y la llave configurada.' };
        return updated;
      });
    }
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
      {/* Cabecera */}
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

      {/* Mensajes */}
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

      {/* Área de Entrada de Texto */}
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
