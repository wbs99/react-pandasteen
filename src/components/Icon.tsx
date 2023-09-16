import c from 'classnames'
import React from 'react'

type Props = {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const Icon = (props: Props) => {
  const { className, name, onClick } = props
  return (
    <svg className={c(className, 'p-icon')} onClick={onClick}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
