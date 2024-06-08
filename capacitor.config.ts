import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fife.app',
  appName: 'FiFe App',
  webDir: '.next',
  server: {
    androidScheme: 'https'
  }
};

export default config;
