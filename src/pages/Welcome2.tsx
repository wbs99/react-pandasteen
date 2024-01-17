import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const Welcome2 = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <Icon name='welcome2' className='w-32 h-32'/>
      <h2 className='text-3xl mt-12'>
        每日提醒 <br/>
        不会遗漏每一笔账单
      </h2>
      <div className='mt-16'>
        <Link className='font-bold text-3xl text-[#757de8]' to='/welcome/3'>下一页</Link>
      </div>
    </div>
  )
}
