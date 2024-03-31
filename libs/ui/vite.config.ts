import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: '@libs/ui',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: 'react',
      output: {
        globals: {
          react: 'React',
        }
      }
    }
  }
})
