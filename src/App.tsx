import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import { Loading } from './components/Loading'
import { usePopup } from './hooks/usePopup'
import { useLoadingStore } from './stores/useLoadingStore'
import { useEffect } from 'react'
type Props = {

}
export const App = (props: Props) => {
  const { visible } = useLoadingStore()
  const { popup, hide, show } = usePopup({
    children: <div p-16px><Loading /></div>,
    position: 'center'
  })
  useEffect(() => {
    visible ? show() : hide()
  }, [visible])

  return (
    <div>
      <RouterProvider router={router} />
      {popup}
    </div>
  )
}