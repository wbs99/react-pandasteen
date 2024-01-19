import { Link } from 'react-router-dom'
import { MyIcon } from '../components/MyIcon'

export const Welcome1 = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <MyIcon name='panda' className='w-32 h-32'/>
      <h2 className='text-3xl mt-12'>
        会挣钱 <br/>
        还要会省钱
      </h2>
      <div className='mt-16'>
        <Link className='font-bold text-3xl text-[#757de8]' to='/welcome/2'>下一页</Link>
      </div>
    </div>
  )
}
