// 用于扩展 axios
import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    _buttonLoading?: boolean
    _autoLoading?: boolean
  }
}
