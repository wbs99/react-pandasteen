import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'



// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    isDev: command === 'serve'  // 在 global.d.ts 声明 isDev， server 说明在开发环境
  },
  plugins: [
    Unocss(),
    react(),
    viteMockServe(),
    // 在  noOptimizeList 数组中的 svg 的 fill 属性不会被删除
    svgsprites({ noOptimizeList: ['panda', 'chart', 'category', 'export', 'remind'] })
  ]
}))