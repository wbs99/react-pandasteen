import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    server: {
      host: true,
      open: true,
      proxy: {
        '/api/v1': {
          target: 'http://121.5.55.95:3000/',
          changeOrigin: command === 'serve',
        },
      }
    },
    plugins: [
      Unocss(),
      react(),
      viteMockServe({
        mockPath: 'src/mock',
      }),
      svgsprites({ noOptimizeList: ['panda', 'chart', 'category', 'export', 'remind', 'calendar', 'welcome2', 'welcome3', 'welcome4'] })
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) { return 'echarts' }
            if (id.includes('node_modules')) { return 'vendor' }
          }
        }
      }
    }
  }
})
