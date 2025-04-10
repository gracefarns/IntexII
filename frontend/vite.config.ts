import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy':
        "default-src 'self'  https://accounts.google.com https://apis.google.com; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " +
        "img-src 'self' data: https://cinenicheblobcontainer.blob.core.windows.net; " +
        "frame-ancestors 'none'; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "connect-src 'self' https://localhost:5000 https://accounts.google.com https://oauth2.googleapis.com https://intex-backend-fmb8dnaxb0dkd8gv.eastus-01.azurewebsites.net https://localhost:3000; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self'; " +
        "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;",
    },
    cors: {
      origin: ['http://localhost:3000', 'https://ambitious-sky-052f4611e.6.azurestaticapps.net'],
      credentials: true,
    },
  },
});
