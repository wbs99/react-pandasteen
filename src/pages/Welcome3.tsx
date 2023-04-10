import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'

export const Welcome3 = () => {
  return (
    <div text-center>
      <Icon name='welcome3' className='w-130px h-108px' />
      <h2 text-32px mt-48px >
        数据可视化 <br />
        收支一目了然
      </h2>
      <div mt-64px>
        <Link text-32px color="#6035BF" font-bold to="/welcome/4">下一页</Link>
      </div>
    </div>
  )
}
