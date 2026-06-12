import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // This forces Vite to ALWAYS use the same single copy of React
    dedupe: ['react', 'react-dom'],
  },
})