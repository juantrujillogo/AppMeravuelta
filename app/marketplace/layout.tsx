import React from 'react';
import Chatbot from '../../components/Chatbot';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {children}
      <Chatbot />
    </div>
  );
}
