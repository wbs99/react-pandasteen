import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useButtonLoadingStore } from '../stores/useButtonLoadingStore'
import { getJwt } from './storage'

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

export const http = new Http(import.meta.env.VITE_APP_API_BASEURL)

// set header
http.instance.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  if (getJwt()) {
    config.headers.Authorization = `Bearer ${getJwt()}`
  }
  if (config._buttonLoading === true) {
    useButtonLoadingStore.getState().starButtonLoading()
  }
  return config
})

// loading
http.instance.interceptors.response.use(
  (response) => {
    if (response.config._buttonLoading === true) {
      useButtonLoadingStore.getState().closeButtonLoading()
    }
    return response
  },
  (error: AxiosError) => {
    if (error.response?.config._buttonLoading === true) {
      useButtonLoadingStore.getState().closeButtonLoading()
    }
    throw error
  }
)

// errors
http.instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response
      const fn = table[status]
      fn?.()
    }
    throw error
  }
)

const table: Record<string, undefined | (() => void)> = {
  401: () => {
    console.log('登录状态过期，请重新登录')
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
