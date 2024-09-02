import { useNavigate } from 'react-router-dom'
import { MyIcon } from '../components/MyIcon'

export const ComingSoonPage = () => {
  const nav = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center h-screen p-12 gap-y-6'>
      <MyIcon name='panda' className='size-32'/>
      <h1>敬请期待</h1>
      <button className='w-btn' onClick={() => nav(-1)}>返回</button>
    </div>
  )
}
