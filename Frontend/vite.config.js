import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/users': 'https://w3villa-task-manager-web-app-x945.vercel.app/',
    },
  },
});

