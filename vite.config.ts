import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'fieldnotes',
        short_name: 'fieldnotes',
        description: 'Minimalist encrypted notes application',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: 'https://write.fieldnotes.land/',
      },
    }),
  ],
});
