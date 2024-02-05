import type { AxiosError } from 'axios'
import { Suspense, lazy } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import { fetchMe } from '../apis/meApi'
import { Loading } from '../components/Loading'
import { Root } from '../components/Root'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { ComingSoonPage } from '../pages/ComingSoonPage'
import { ErrorUnauthorized } from '../pages/Errors'
import { ErrorPage } from '../pages/Errors/ErrorPage'
import { HomePage } from '../pages/HomePage'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { ItemsPage } from '../pages/ItemsPage'
import { LoginPage } from '../pages/LoginPage'
import { TagEditPage } from '../pages/TagEditPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'

function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(
  factory: () => Promise<I>,
  name: K,
): I {
  return Object.create({
    [name]: lazy(() => factory().then(module => ({ default: module[name] }))),
  })
}

// 页面资源较大时，使用 lazy import 即可
const { StatisticsPage } = lazyImport(() => import('../pages/StatisticsPage'), 'StatisticsPage')

export const router = createBrowserRouter([
  // 访问 / 路径，在 Root 中判断跳转哪个页面
  { path: '/', element: <Root /> },
  { path: '/home', element: <HomePage title='首页' /> },
  { path: '/login', element: <LoginPage /> },
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
      const onFetchMeError = async (error: AxiosError) => {
        if (error.response?.status === 401) {
          throw new ErrorUnauthorized()
        }
        throw error
      }
      return await fetchMe().catch(onFetchMeError)
    },
    children: [
      {
        path: '/items',
        element: <ItemsPage />,
        // errorElement: <ItemsPageError />,
        // loader: async () => {
        //   const onError = (error: AxiosError) => {
        //     if (error.response?.status === 401) { throw new ErrorUnauthorized() }
        //     throw error
        //   }
        //   const response = await ajax.get<Resources<Item>>('/api/v1/items?page=1').catch(onError)
        //   if (response.data.resources.length > 0) {
        //     return response.data
        //   } else {
        //     throw new ErrorEmptyData()
        //   }
        // }
      },
      { path: '/items/new', element: <ItemsNewPage /> },
      {
        path: '/statistics',
        element: <Suspense fallback={<Loading />}>
          <StatisticsPage />
        </Suspense>
      },
      { path: '/tags/:id', element: <TagEditPage /> },
      { path: '/tags/new', element: <TagsNewPage /> },
      { path: '/export', element: <ComingSoonPage /> },
      { path: '/remind', element: <ComingSoonPage /> }
    ]
  },
  { path: '*', element: <Root /> }
])
