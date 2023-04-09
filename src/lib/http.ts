import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

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

export const http = new Http(import.meta.env.VITE_APP_API_BASEURL)

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
      console.log('cancel loading')
      // closeToast()
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response?.config._autoLoading === true) {
      console.log('cancel loading')
      // closeToast()
    }
    throw error
  }
)

// errors
http.instance.interceptors.response.use(
  response => {
    if (response.data.success !== false) {
      return response
    } else {
      return Promise.reject('请求失败')
    }
  },
  (error: AxiosError) => {
    const errorCode = error.response?.status
    if (errorCode === 401) {
      console.log('登录状态过期，请重新登录')
    } else if (errorCode === 429) {
      console.log('请求太频繁')
    } else if (errorCode === 500) {
      console.log('服务器繁忙')
    }
    throw error
  }
)