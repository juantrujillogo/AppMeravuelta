import type { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'SmarcartIA',
  description: 'Marketplace Empresarial',
};

import { CartSimulationProvider } from '../components/CartSimulationContext';
import CartDrawer from '../components/CartDrawer';

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
          <CartDrawer />
        </CartSimulationProvider>
      </body>
    </html>
  );
}
