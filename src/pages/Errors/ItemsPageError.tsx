import { Navigate, useLocation, useRouteError } from 'react-router-dom'
import { ErrorEmptyData, ErrorUnauthorized } from '.'

export const ItemsPageError = () => {
  const error = useRouteError() as Error
  const loc = useLocation()
  if (error instanceof ErrorUnauthorized) {
    const return_to = encodeURIComponent(`${loc.pathname}${loc.search}`)
    return <Navigate to={`/login?return_to=${return_to}`} />
  }
  else if (error instanceof ErrorEmptyData) {
    return <Navigate to="/home" replace />
  }
  else {
    return <div>出错了</div>
  }
}
