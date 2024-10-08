import { Icon } from '@iconify/react'
import c from 'classnames'

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
      : <svg className={c(className, 'w-icon')} onClick={onClick} aria-hidden='true'>
          <use xlinkHref={`#${name}`}></use>
        </svg>

  )
}
