import { Link, useLocation } from "react-router-dom"
import { comfirmable } from "../../lib/comfirmable"
import { getMeApi } from "../../api"

interface Props {
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
    <div block className={className} bg="#5C33BE" text-white w="100%" pt-32px pb-44px
      px-16px>
      {error
        ? (
          <Link to={`/login?return=${return_to}`} >
            <h2 text-24px>未登录用户</h2>
            <div text="#CEA1FF">点击这里登录</div>
          </Link>
        )
        : (
          <div onClick={signOut}>
            <h2 text-24px title={name} overflow-hidden text-ellipsis>{name}</h2>
            <div text="#CEA1FF">点击这里退出登录</div>
          </div>
        )
      }
    </div >
  )
}