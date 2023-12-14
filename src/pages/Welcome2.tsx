import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const Welcome2 = () => {
  return (
    <div className='text-center'>
      <Icon name='welcome2' className='w-128px h-150px' />
      <h2 className='text-32px mt-48px'>
        每日提醒 <br />
        不会遗漏每一笔账单
      </h2>
      <div className='mt-64px'>
        <Link className='text-32px color-#6035BF font-bold' to='/welcome/3'>下一页</Link>
      </div>
    </div>
  )
}
