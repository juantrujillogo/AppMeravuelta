import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'SmarcartIA',
  description: 'Marketplace Empresarial',
};

import { CartSimulationProvider } from '../components/CartSimulationContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartSimulationProvider>
          {children}
        </CartSimulationProvider>
      </body>
    </html>
  );
}
