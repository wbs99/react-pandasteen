import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const Welcome2 = () => {
  return (
    <div className='text-center'>
      <Icon name='welcome2' className='w-32 h-36' />
      <h2 className='text-3xl mt-12'>
        每日提醒 <br />
        不会遗漏每一笔账单
      </h2>
      <div className='mt-16'>
        <Link className='text-3xl text-[#6035BF] font-bold' to='/welcome/3'>下一页</Link>
      </div>
    </div>
  )
}
