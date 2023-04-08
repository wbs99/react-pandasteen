import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorUnauthorized } from '.'

export const ErrorPage = () => {
  const error = useRouteError() as Error
  const loc = useLocation()
  const return_to = encodeURIComponent(`${loc.pathname}${loc.search}`)
  if (error instanceof ErrorUnauthorized) {
    return <Navigate replace to={`/sign_in?return_to=${return_to}`} />
  } else {
    return <div>未知错误</div>
  }
}