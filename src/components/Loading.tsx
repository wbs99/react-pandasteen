import styled from 'styled-components'
import c from 'classnames'
import { Icon } from './Icon'

const Div = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: spin 1.25s linear infinite;
  }
`

interface Props {
  className?: string
  loadingText?: string
}

export const Loading = (props: Props) => {
  const { className, loadingText } = props
  return (
    <Div className={c('flex flex-col justify-center items-center', className)}>
      <Icon name="loading" className='w-96px h-96px' />
      <p p-24px text-lg>{loadingText || '加载中……'}</p>
    </Div>
  )
}