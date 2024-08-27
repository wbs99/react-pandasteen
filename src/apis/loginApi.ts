import { http } from '../utils/http'

export type LoginParams = {
  email: string
  code: string
}

export const sendSmsCodeApi = (data: { email: string }) => http.post('/api/v1/validation_codes', data)

export const loginApi = (data: LoginParams) => http.post<{ jwt: string; refresh_jwt: string }>('/api/v1/session', data, { _buttonLoading: true })

export const getRefreshJwtApi = () => http.get<{ jwt: string; refresh_jwt: string }>('/api/v1/refresh_jwt')
