import { Link } from 'react-router-dom'
import { SvgIcon } from '../components/SvgIcon'

export const Welcome1 = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <SvgIcon name='panda' className='size-32'/>
      <h2 className='mt-12 text-3xl'>
        会挣钱 <br/>
        还要会省钱
      </h2>
      <div className='mt-16'>
        <Link className='font-bold text-3xl text-[#757de8]' to='/welcome/2'>下一页</Link>
      </div>
    </div>
  )
}
