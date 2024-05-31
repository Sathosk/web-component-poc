import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: 'production',
    },
  },
  plugins: [react()],
  // custom build to bundle webcomponent
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'amazing-component',
      fileName: (format) => `amazing-component.${format}.js`,
    },
    target: 'esnext',
  },
})
