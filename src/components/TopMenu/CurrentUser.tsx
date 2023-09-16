import { Link, useLocation } from 'react-router-dom'
import c from 'classnames'
import { comfirmable } from '../../lib/comfirmable'
import { getMeApi } from '../../api'

type Props = {
  className?: string
}
export const CurrentUser = (props: Props) => {
  const { className } = props
  const { data: me, error } = getMeApi()
  const name = me?.name ?? me?.email
  const loc = useLocation()
  const return_to = encodeURIComponent(`${loc.pathname}${loc.search}`)
  const signOut = comfirmable('确定要退出登录吗？', () => {
    window.localStorage.removeItem('jwt')
    window.location.reload()
  })

  return (
    <div className={c(className, 'block bg-#5C33BE text-white w-100% pt-32px pb-44px px-16px')}>
      {error
        ? (
          <Link to={`/login?return=${return_to}`} >
            <h2 className='text-24px'>未登录用户</h2>
            <div className='text-#CEA1FF'>点击这里登录</div>
          </Link>
        )
        : (
          <div onClick={signOut}>
            <h2 title={name} className='text-24px truncate'>{name}</h2>
            <div className='text-#CEA1FF'>点击这里退出登录</div>
          </div>
        )
      }
    </div >
  )
}
