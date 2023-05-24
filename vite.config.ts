import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';

// https://vitejs.dev/config/
export default (args) => {
  return defineConfig({
    plugins: [react()],
    publicDir: 'assets',
    server: {
      proxy: {
        '/api': {
          target: 'https://localhost:8001',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/central': {
          target: 'https://localhost:8001',
          changeOrigin: true,
          secure: false,
          ws: true
        },
      }
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
        generateScopedName: args.mode === 'development'
          ? '[local]_[hash:base64:2]'
          : '[hash:base64:2]'
      }
    }
  })
}
