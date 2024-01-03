import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import 'virtual:svgsprites'
import './assets/styles/tailwind.scss'
import './assets/styles/global.scss'

const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
export { div as rootDiv }
