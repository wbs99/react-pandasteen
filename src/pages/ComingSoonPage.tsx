import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const ComingSoonPage = () => {
  const nav = useNavigate()

  return (
    <div className='flex justify-center items-center flex-col gap-y-24px py-48px h-screen px-48px'>
      <Icon name="panda" className="w-128px h-128px" />
      <h1>敬请期待</h1>
      <button className='p-btn' onClick={() => nav(-1)}>返回</button>
    </div>
  )
}
