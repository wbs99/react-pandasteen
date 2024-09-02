import { useNavigate } from 'react-router-dom'
import { MyIcon } from '../components/MyIcon'
import { useLocalStore } from '../stores/useLocalStore'

export const Welcome4 = () => {
  const { setHadReadWelcome } = useLocalStore()
  const nav = useNavigate()
  const onSkip = () => {
    setHadReadWelcome(true)
    nav('/home')
  }

  return (
    <div className='flex flex-col items-center text-center'>
      <MyIcon name='welcome4' className='size-32'/>
      <h2 className='mt-12 text-3xl'>
        云备份 <br/>
        再也不怕数据丢失
      </h2>
      <div className='mt-16'>
        <span className='font-bold text-3xl text-[#757de8]' onClick={onSkip}>开启应用</span>
      </div>
    </div>
  )
}
