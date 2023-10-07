import cs from 'classnames'
import type { ReactNode } from 'react'
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
    <div className={cs(className, classPrefix)} flex flex-col>
      <ol
        className={cs('flex text-white children-px-24px children-py-12px grow-0 shrink-0 bg-[rgb(143,76,215)]', classPrefix ? `${classPrefix}-tabs` : '')}
        >
        {
          tabItems.map(item => <li key={typeof item.key === 'string' ? item.key : item.key.name} className={
            cs(
              compareKey(item.key, value) ? s.selected : '',
              classPrefix ? `${classPrefix}-menu-item` : ''
            )
          }
            onClick={() => onChange(item.key)}>
            {item.text}
          </li>)
        }
      </ol>
      <div className={cs('grow-1 shrink-1 overflow-auto', classPrefix ? `${classPrefix}-pane` : '')}
      >
        {tabItems.find(item => compareKey(item.key, value))?.element}
      </div>
    </div>
  )
}
