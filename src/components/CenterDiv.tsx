import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const CenterDiv = (props: Props) => {
  const { children } = props

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{children}</div>
  )
}
