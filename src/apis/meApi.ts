import useSWR from 'swr'
import { http } from '../utils/http'

export type User = {
  id: number
  email: string
  name?: string
  created_at: string
  updated_at: string
}
export type UserParams = Partial<User>

export const getMeApi = () => {
  const { data, error, isLoading } = useSWR(
    '/api/v1/me',
    async (path) => {
      const response = await http.get<Resource<User>>(path)
      return response.data.resource
    }
  )

  return { meData: data, meError: error, isLoadingMe: isLoading }
}

// 用来在 router 中判断是否已登录
export const fetchMe = () => http.get<Resource<User>>('/api/v1/me')
