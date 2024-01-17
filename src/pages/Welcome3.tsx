import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const Welcome3 = () => {
  return (
    <div className='flex flex-col items-center text-center'>
      <Icon name='welcome3' className='w-32 h-32'/>
      <h2 className='text-3xl mt-12'>
        数据可视化 <br/>
        收支一目了然
      </h2>
      <div className='mt-16'>
        <Link className='font-bold text-3xl text-[#757de8]' to='/welcome/4'>下一页</Link>
      </div>
    </div>
  )
}
