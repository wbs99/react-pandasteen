import c from 'classnames'
import { Icon } from '@iconify/react'

type Props = {
  className?: string
  name: string
  onClick?: (e: React.MouseEvent) => void
}

export const SvgIcon = (props: Props) => {
  const { className, name, onClick } = props

  return (
    name.includes(':')
      ? <Icon icon={name} className={c(className, 'w-icon')} onClick={onClick} />
      : <svg className={c(className, 'w-icon')} onClick={onClick}>
          <use xlinkHref={`#${name}`}></use>
        </svg>

  )
}
