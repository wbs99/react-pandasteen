import {
  defineConfig, presetAttributify, presetIcons, presetTypography, presetUno
} from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx-babel'

export default defineConfig({
  rules: [
    ['h-screen', { height: 'calc(100vh - var(--vh-offset, 0px))' }]
  ],
  shortcuts: {
    'p-btn': 'h-48px w-100% bg-#5C33BE b-none text-white text-18px rounded-8px px-12px flex justify-center items-center',
    'p-input-text': 'h-48px pl-16px leading-32px py-8px b-#5C33BE b-1 focus:shadow focus:shadow-inset rounded-8px text-18px',
    'p-form': 'px-16px flex flex-col gap-y-16px children-flex children-flex-col',
    'p-form-label': 'text-18px mb-8px',
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx()
  ]
})
