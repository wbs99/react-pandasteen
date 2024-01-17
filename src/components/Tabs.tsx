import type { ReactNode } from 'react'
import { cn } from '../utils/cn'
import s from './Tabs.module.scss'

type Props<T> = {
  tabItems: {
    key: T
    text: string
    element?: ReactNode
  }[]
  value: T
  onChange: (key: T) => void
  className?: string
  classPrefix?: string
}

const compareKey = <T extends (string | { name: string })>(a: T, c: T) => {
  if (typeof a === 'string' && typeof c === 'string') {
    return a === c
  }
  else if (a instanceof Object && c instanceof Object) {
    return a.name === c.name
  }
  else {
    return false
  }
}

export const Tabs = <T extends string | { name: string }>(props: Props<T>) => {
  const { tabItems, value, onChange, className, classPrefix } = props

  return (
    <div className={cn(className, classPrefix, 'flex flex-col')}>
      <ol
        className={cn('flex grow-0 shrink-0 child:px-6 child:py-3 text-white bg-gradient-to-r from-[#4052b6] to-[#747ce7]', classPrefix ? `${classPrefix}-tabs` : '')}
        >
        {
          tabItems.map(item => <li key={typeof item.key === 'string' ? item.key : item.key.name} className={
            cn(
              compareKey(item.key, value) ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item` : ''
            )
          }
            onClick={() => onChange(item.key)}>
            {item.text}
          </li>)
        }
      </ol>
      <div className={cn('grow shrink overflow-auto', classPrefix ? `${classPrefix}-pane` : '')}
      >
        {tabItems.find(item => compareKey(item.key, value))?.element}
      </div>
    </div>
  )
}
