import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.geolocationapp',
  appName: 'GeoLocationApp',
  webDir: 'dist/GeoLocationApp/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;