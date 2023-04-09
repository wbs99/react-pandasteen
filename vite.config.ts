import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'


// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      proxy: {
        '/api/': {
          open: true,
          port: 5173,
          target: 'http://121.196.236.94:8080/',
          changeOrigin: command === 'serve',
          rewrite: (path) => path.replace(/^\/api/, 'api'),
        },
      }
    },
    define: {
      isDev: command === 'serve'
    },
    plugins: [
      Unocss(),
      react(),
      viteMockServe(),
      svgsprites({ noOptimizeList: ['panda', 'chart', 'category', 'export', 'remind', 'calendar'] })
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    },
  }
})