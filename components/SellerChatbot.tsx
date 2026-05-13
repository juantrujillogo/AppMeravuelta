"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, X, Send, Briefcase } from 'lucide-react';

type Message = { sender: 'bot' | 'user'; text: string };

export default function SellerChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '¡Hola! Soy tu Asistente Privado de Negocios. Analizo tu catálogo y te ayudo a crear estrategias para vender más. ¿En qué te asesoro hoy?' }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if(!inputText.trim()) return;
    
    const userMsg = inputText.trim();
    const newMessages: Message[] = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMessages);
    setInputText("");

    setMessages(prev => [...prev, { sender: 'bot', text: 'Analizando...' }]);

    try {
      const response = await fetch('/api/seller-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'bot', text: data.reply };
          return updated;
        });
      } else {
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

  const renderMessageContent = (text: string) => {
    // Renderizado básico de Markdown para texto en negrita
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 hover:scale-110 transition-all duration-300 z-50 group flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(15,23,42,0.4)]"
      >
        <MessageSquareText className="w-7 h-7 group-hover:hidden" />
        <Briefcase className="w-7 h-7 hidden group-hover:block animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[550px] bg-white/95 backdrop-blur-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-3xl flex flex-col z-50 overflow-hidden font-sans ring-1 ring-black/5">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-4 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
            <Briefcase className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-50">Asistente de Negocios</h3>
            <p className="text-xs text-slate-300 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]"></span> Conectado a Inventario
            </p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors active:scale-90 text-slate-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3.5 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.sender === 'user' 
                ? 'bg-slate-900 text-white rounded-3xl rounded-tr-sm shadow-md' 
                : 'bg-white border border-gray-200 text-gray-700 shadow-sm rounded-3xl rounded-tl-sm'
            }`}>
              {msg.sender === 'bot' ? renderMessageContent(msg.text) : msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de Entrada de Texto */}
      <div className="p-4 bg-white/80 border-t border-gray-200 shrink-0 backdrop-blur-md">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pídele un análisis o un copy para un producto..."
            className="flex-1 bg-slate-100 border-none rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/50 text-slate-900 font-medium"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="bg-slate-900 p-3 rounded-full text-white hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 transition-colors shadow-md active:scale-95 flex items-center justify-center h-11 w-11"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
