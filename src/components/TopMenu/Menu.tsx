import { NavLink } from 'react-router-dom'
import { Icon } from '../Icon'
import { cn } from '../../utils/cn'

type Props = {
  className?: string
}

const items = [
  { icon: 'category', text: '记账', to: '/items' },
  { icon: 'chart', text: '统计图表', to: '/statistics' },
  { icon: 'export', text: '导出数据', to: '/export' },
  { icon: 'remind', text: '记账提醒', to: '/remind' }
]

export const Menu = (props: Props) => {
  const { className } = props
  
  return (
    <ul className={cn(className, 'text-xl py-4 bg-white')}>
      {items.map(item =>
        <li key={item.to}>
          <NavLink className='flex items-center px-4 py-2 mb-1' to={item.to}>
            <Icon name={item.icon} className='w-8 h-8 mr-4'/>{item.text}
          </NavLink>
        </li>)}
    </ul>
  )
}
