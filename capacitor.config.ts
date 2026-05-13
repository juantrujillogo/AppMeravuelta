import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smarcartia.app',
  appName: 'SmarcartIA',
  webDir: 'public', // Usamos public porque Next.js no exportará out estático
  server: {
    url: 'http://192.168.1.131:3000',
    cleartext: true
  }
};

export default config;
