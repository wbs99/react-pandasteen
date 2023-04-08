import { Outlet, createBrowserRouter } from 'react-router-dom'
import { Root } from '../components/Root'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { HomePage } from '../pages/HomePage'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { ItemsPage } from '../pages/ItemsPage'
import { SignInPage } from '../pages/SIgnInPage'
import { StatisticsPage } from '../pages/StatisticsPage'
import { TagEditPage } from '../pages/TagEditPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import axios, { AxiosError } from 'axios'
import { ErrorUnauthorized, ErrorEmptyData } from '../pages/Errors'
import { ItemsPageError } from '../pages/Errors/ItemsPageError'
import { preload } from 'swr'
import { ErrorPage } from '../pages/Errors/ErrorPage'

export const router = createBrowserRouter([
  // 访问 / 路径，在 Root 中判断跳转哪个页面
  { path: '/', element: <Root /> },
  { path: '/home', element: <HomePage title='首页' /> },
  { path: '/sign_in', element: <SignInPage /> },
  {
    path: '/welcome',
    element: <WelcomeLayout />,
    children: [
      { path: '1', element: <Welcome1 /> },
      { path: '2', element: <Welcome2 /> },
      { path: '3', element: <Welcome3 /> },
      { path: '4', element: <Welcome4 /> },
    ]
  },
  // 这一组中的所有路由均需要登录后才可以访问
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return await axios.get<Resource<User>>('/api/v1/me').catch(e => {
        if (e.response?.status === 401) { throw new ErrorUnauthorized }
      })
    },
    children: [
      {
        path: '/items',
        element: <ItemsPage />,
        errorElement: <ItemsPageError />,
        loader: async () => {
          const onError = (error: AxiosError) => {
            if (error.response?.status === 401) { throw new ErrorUnauthorized() }
            throw error
          }
          const response = await axios.get<Resources<Item>>('/api/v1/items?page=1').catch(onError)
          if (response.data.resources.length > 0) {
            return response.data
          } else {
            throw new ErrorEmptyData()
          }
        }
      },
      { path: '/items/new', element: <ItemsNewPage /> },
      { path: '/statistics', element: <StatisticsPage /> },
      { path: '/export', element: <div>敬请期待</div> },
      { path: '/tags', element: <div>标签</div> },
      { path: '/tags/:id', element: <TagEditPage /> },
      { path: '/tags/new', element: <TagsNewPage /> },
      { path: '/remind', element: <div>敬请期待</div> }
    ]
  }
])