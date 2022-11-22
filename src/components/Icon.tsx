import c from 'classnames'
import React from 'react'

interface Props {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon: React.FC<Props> = ({ name, className, onClick }) => {
  return (
    <svg className={c(className, 'p-icon')} onClick={onClick}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}