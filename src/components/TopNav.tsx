import type { ReactNode } from 'react'

type Props = {
  title?: string
  icon: ReactNode
}

export const TopNav = (props: Props) => {
  const { title = '熊猫', icon } = props

  return (
    <div className='flex items-center px-6 pt-6 pb-2 text-white'>
      <span className='flex items-center justify-center mr-4 size-6 child:max-w-full child:max-h-full'>
        {icon}
      </span>
      <h1 className='text-2xl'>{title}</h1>
    </div>
  )
}
