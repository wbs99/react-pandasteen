import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const Welcome1 = () => {
  return (
    <div className='text-center'>
      <Icon name='panda' className='w-32 h-32' />
      <h2 className='text-3xl mt-12' >
        会挣钱 <br />
        还要会省钱
      </h2>
      <div className='mt-16'>
        <Link className='text-3xl text-[#6035BF] font-bold' to='/welcome/2'>下一页</Link>
      </div>
    </div>
  )
}
