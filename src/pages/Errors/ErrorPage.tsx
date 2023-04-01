import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorUnauthorized } from '.'

export const ErrorPage = () => {
  const error = useRouteError() as Error
  const loc = useLocation()
  const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
  if (error instanceof ErrorUnauthorized) {
    return <Navigate to={`/sign_in?from=${from}`} />
  } else {
    return <div>未知错误</div>
  }
}