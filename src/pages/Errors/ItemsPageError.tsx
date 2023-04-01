import { useRouteError, Navigate, useLocation } from "react-router-dom"
import { ErrorUnauthorized, ErrorEmptyData } from "."


export const ItemsPageError = () => {
  const error = useRouteError()
  const e = error as Error
  const loc = useLocation()
  if (e instanceof ErrorUnauthorized) {
    const from = encodeURIComponent(`${loc.pathname}${loc.search}`)
    return <Navigate to={`/sign_in?from=${from}`} />
  } else if (e instanceof ErrorEmptyData) {
    return <Navigate to="/home" replace />
  } else {
    return <div>出错了</div>
  }
}