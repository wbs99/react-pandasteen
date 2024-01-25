import c from 'classnames'
import React from 'react'

type Props = {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const MyIcon = (props: Props) => {
  const { className, name, onClick } = props

  return (
    <svg className={c(className, 'w-icon')} onClick={onClick}>
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
