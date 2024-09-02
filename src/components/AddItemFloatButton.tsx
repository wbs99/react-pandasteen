import { Link } from 'react-router-dom'
import { SvgIcon } from './SvgIcon'

export const AddItemFloatButton = () => {
  return (
    <Link to='/items/new'>
      <button className='fixed flex items-center justify-center text-white border-none rounded-full bottom-4 right-4 size-14 bg-primary'>
        <SvgIcon name='add' className='size-9'/>
      </button>
    </Link>
  )
}
