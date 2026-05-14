import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smarcartia.app',
  appName: 'SmarcartIA',
  webDir: 'public', // Usamos public porque Next.js no exportará out estático
  server: {
    url: 'https://smart-cart-ai-escr-azure.vercel.app'
  }
};

export default config;
