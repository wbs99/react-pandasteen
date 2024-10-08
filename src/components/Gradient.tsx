import type { ReactNode } from 'react'
import c from 'classnames'

type Props = {
  children: ReactNode
  className?: string
}

export const Gradient = (props: Props) => {
  const { children, className } = props

  return (
    <div className={c(className, 'bg-gradient-to-r from-[#4052b6] to-[#747ce7]')}>
      {children}
    </div>
  )
}
