import axios, { AxiosRequestConfig } from 'axios'
import { useLoadingStore } from '../stores/useLoadingStore'

axios.defaults.baseURL = isDev ? '/' : 'http://121.196.236.94:8080/api/v1'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000

type Options = {
  showLoading?: boolean
}
export const useAjax = (options?: Options) => {
  const showLoading = options?.showLoading || false
  const { setVisible } = useLoadingStore()
  const ajax = {
    get: <T>(path: string, config?: AxiosRequestConfig<any>) => {
      return axios.get<T>(path, config)
    },
    post: <T>(path: string, data: JSONValue) => {
      if (showLoading) { setVisible(true) }
      return axios.post<T>(path, data).finally(() => {
        if (showLoading) { setVisible(false) }
      })
    },
    patch: () => { },
    delete: () => { },
  }
  return ajax
}