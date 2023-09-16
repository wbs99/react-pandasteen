import { useNavigate } from 'react-router-dom'
import { useLocalStore } from '../stores/useLocalStore'
import { Icon } from '../components/Icon'

export const Welcome4 = () => {
  const { setHadReadWelcome } = useLocalStore()
  const nav = useNavigate()
  const onSkip = () => {
    setHadReadWelcome(true)
    nav('/home')
  }

  return (
    <div className='text-center'>
      <Icon name='welcome4' className='w-129px h-83px' />
      <h2 className='text-32px mt-48px'>
        云备份 <br />
        再也不怕数据丢失
      </h2>
      <div className='mt-64px'>
        <span className='text-32px color-#6035BF font-bold' onClick={onSkip}>开启应用</span>
      </div>
    </div>
  )
}
