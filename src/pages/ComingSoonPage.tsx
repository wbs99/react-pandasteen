import { useNavigate } from 'react-router-dom'
import { MyIcon } from '../components/MyIcon'

export const ComingSoonPage = () => {
  const nav = useNavigate()

  return (
    <div className='flex flex-col justify-center items-center gap-y-6 p-12 h-screen'>
      <MyIcon name='panda' className='w-32 h-32'/>
      <h1>敬请期待</h1>
      <button className='w-btn' onClick={() => nav(-1)}>返回</button>
    </div>
  )
}
