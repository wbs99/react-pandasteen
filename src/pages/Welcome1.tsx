import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const Welcome1 = () => {
  return (
    <div className='text-center'>
      <Icon name='panda' className='w-128px h-130px' />
      <h2 className='text-32px mt-48px' >
        会挣钱 <br />
        还要会省钱
      </h2>
      <div className='mt-64px'>
        <Link className='text-32px color-#6035BF font-bold' to='/welcome/2'>下一页</Link>
      </div>
    </div>
  )
}
