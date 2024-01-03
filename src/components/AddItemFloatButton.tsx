import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export const AddItemFloatButton = () => {
  return (
    <Link to='/items/new'>
      <button className='w-14 h-14 bg-primary rounded-full border-none text-white
        fixed bottom-4 right-4 flex justify-center items-center'>
        <Icon name='add' className='w-9 h-9' />
      </button>
    </Link>
  )
}
