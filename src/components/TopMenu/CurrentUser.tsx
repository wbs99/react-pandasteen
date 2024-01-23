import { Link, useLocation } from 'react-router-dom'
import { getMeApi } from '../../apis/meApi'
import { cn } from '../../utils/cn'
import { comfirmable } from '../../utils/comfirmable'
import { removeJwt } from '../../utils/storage'

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
    removeJwt()
    window.location.reload()
  })

  return (
    <div className={cn(className, 'block w-full pt-8 pb-11 px-4 bg-primary text-white')}>
      {error
        ? <Link to={`/login?return=${return_to}`} >
            <h2 className='text-2xl'>未登录用户</h2>
            <div className='text-[#CEA1FF]'>点击这里登录</div>
          </Link>
        : <div onClick={signOut}>
            <h2 title={name} className='text-2xl truncate'>{name}</h2>
            <div className='text-[#CEA1FF]'>点击这里退出登录</div>
          </div>
      }
    </div>
  )
}
