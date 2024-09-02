import path from 'node:path'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    server: {
      host: true,
      proxy: {
        '/api/v1': {
          target: 'http://118.31.32.176:3000/',
          changeOrigin: command === 'serve',
        },
      }
    },
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'src/mock',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: '[name]',
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) { return 'echarts' }
            if (id.includes('mock') || id.includes('faker')) { return 'mock' }
            if (id.includes('node_modules')) { return 'vendor' }
          }
        }
      }
    }
  }
})
