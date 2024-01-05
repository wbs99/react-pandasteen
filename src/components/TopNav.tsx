import type { ReactNode } from 'react'

type Props = {
  title?: string
  icon: ReactNode
}

export const TopNav = (props: Props) => {
  const { title = '熊猫', icon } = props

  return (
    <div className='flex items-center text-white pt-6 pb-2 px-6'>
      <span className='flex justify-center items-center w-6 h-6 mr-4 child:max-w-full child:max-h-full'>
        {icon}
      </span>
      <h1 className='text-2xl'>{title}</h1>
    </div>
  )
}
