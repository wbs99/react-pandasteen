import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { router } from './../routes/router'

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

const table: Record<string, undefined | (() => void)> = {
  401: () => {
    router.navigate('/login')
  },
  402: () => {
    console.log('请付费后观看')
  },
  403: () => {
    console.log('没有权限')
  },
  429: () => {
    console.log('请求过于频繁')
  },
  500: () => {
    console.log('服务器错误')
  }
}

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string, timeout = 1000 * 60) {
    this.instance = axios.create({ baseURL, timeout })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url, params: query, method: 'delete' })
  }
}

const baseURL = import.meta.env.MODE === 'development' ? '/' : import.meta.env.VITE_APP_API_BASEURL
export const http = new Http(baseURL)

// set header
http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt') || ''
  config.headers = config.headers || {}
  if (jwt) { config.headers.Authorization = `Bearer ${jwt}` }
  if (config._autoLoading === true) {
    console.log('loading')
    // showLoadingToast({
    //   message: config._loadingText || '加载中...',
    //   forbidClick: true,
    //   duration: 0
    // })
  }
  return config
})

// loading
http.instance.interceptors.response.use(
  response => {
    if (response.config._autoLoading === true) {
      console.log('request success')
      // closeToast()
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response?.config._autoLoading === true) {
      console.log('request error')
      // closeToast()
    }
    throw error
  }
)

// errors
http.instance.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response
      const fn = table[status]
      fn?.()
    }
    throw error
  }
)
