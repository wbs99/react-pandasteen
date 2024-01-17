import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

type Props = {
  children: ReactNode
  className?: string
}

export const Gradient = (props: Props) => {
  const { children, className } = props

  return (
    <div className={cn(className, 'bg-gradient-to-r from-[#4052b6] to-[#747ce7]')}>
      {children}
    </div>
  )
}
