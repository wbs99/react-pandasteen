import type { ReactNode } from 'react'

type Props = {
  title?: string
  icon: ReactNode
}

export const TopNav = (props: Props) => {
  const { title = '熊猫记账', icon } = props

  return (
    <div className='text-white flex items-center pt-24px pb-8px px-24px'>
      <span className='w-24px h-24px mr-16px flex justify-center items-center children-max-w-100% children-max-h-100%'>
        {icon}
      </span>
      <h1 className='text-24px'>{title}</h1>
    </div>
  )
}
