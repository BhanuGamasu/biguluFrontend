import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SampleP1',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "289704636604-dma51r6nv4ospg2itcie5i3l36n3ldj5.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
