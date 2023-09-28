import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorUnauthorized } from '.'

export const ErrorPage = () => {
  const error = useRouteError() as Error
  const loc = useLocation()
  const return_to = encodeURIComponent(`${loc.pathname}${loc.search}`)
  if (error instanceof ErrorUnauthorized) {
    return <Navigate to={`/login?return_to=${return_to}`} replace />
  }
  else {
    return <div>未知错误</div>
  }
}
