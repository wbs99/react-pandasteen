import { router } from './../routes/router';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>


const table: Record<string, undefined | (() => void)> = {
  401: () => {
    router.navigate('/login')
  },
  402: () => {
    window.alert('请付费后观看')
  },
  403: () => {
    window.alert('没有权限')
  },
  429: () => {
    window.alert('请求过于频繁')
  },
  500: () => {
    window.alert('服务器错误')
  }
}

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string, timeout = 1000 * 60) {
    this.instance = axios.create({ baseURL, timeout })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}


const baseURL = import.meta.env.VITE_MODE === 'development' ? '/' : 'http://121.196.236.94:8080/'
// const baseURL = 'http://121.196.236.94:8080/'
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