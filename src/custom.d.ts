// 用于扩展 axios
import { AxiosRequestConfig } from 'axios'
declare module 'axios' {
  export interface AxiosRequestConfig {
    _autoLoading?: boolean
    _loadingText?: string
    _mock?: string
  }
}