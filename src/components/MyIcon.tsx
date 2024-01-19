import React from 'react'
import { cn } from '../utils/cn'

type Props = {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const MyIcon = (props: Props) => {
  const { className, name, onClick } = props

  return (
    <svg className={cn(className, 'w-icon')} onClick={onClick}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
