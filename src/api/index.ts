import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { http } from '../utils/http'
import type { Time } from '../utils/time'

export const sendSmsCodeApi = (data: { email: string }) => http.post('/api/v1/validation_codes', data)

export const loginApi = (data: LoginForm) => http.post<{ jwt: string; refresh_jwt: string }>('/api/v1/session', data, { _buttonLoading: true })

// 用来在 router 中判断是否已登录
export const fetchMe = () => http.get<Resource<User>>('/api/v1/me')

export const getRefreshJwt = () => http.get<{ jwt: string; refresh_jwt: string }>('/api/v1/refresh_jwt')

export const getMeApi = () => {
  const { data, error, isLoading } = useSWR('/api/v1/me', async (path) => {
    const response = await http.get<Resource<User>>(path)
    return response.data.resource
  })

  return { data, error, isLoading }
}

export const getItemsApi = (meData?: User) => {
  const { data, error, isLoading } = useSWR(meData ? '/api/v1/items' : null, async (path) => {
    const response = await http.get<Resources<Item>>(path)
    return response.data
  })

  return { data, error, isLoading }
}

export const getItemListApi = (start: Time, end: Time) => {
  const getKey = (pageIndex: number, prev: Resources<Item>) => {
    const { pager, resources } = prev || {}
    if (pager && (pager.page - 1) * pager.per_page + resources.length >= pager.count) {
      return null
    }

    return `api/v1/items?page=${pageIndex + 1}&happened_after=${start.removeTime().isoString}&happened_before=${end.removeTime().isoString}`
  }
  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    async (path) => {
      const response = await http.get<Resources<Item>>(path)
      return response.data
    },
    { revalidateAll: true }
  )
  let hasMore
  const onLoadMore = () => setSize(size + 1)
  const isLoadingMore = data?.[size - 1] === undefined && !error
  if (data) {
    const last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    hasMore = (page - 1) * per_page + last.resources.length < count
  }

  return {
    data, error, isLoading, onLoadMore, isLoadingMore, hasMore
  }
}

// 收入 支出 净收入
export const getItemsBalanceApi = (start: Time, end: Time) => {
  const { data } = useSWR(start && end && `/api/v1/items/balance?happened_after=${start.isoString}&happened_before=${end.isoString}`,
    async (path) => {
      const response = await http.get<{ balance: number; expenses: number; income: number }>(path)
      return response.data
    })

  return { data }
}

// type GetKeyParams = {
//   start: Time
//   end: Time
//   kind: Item['kind']
//   group_by: 'happen_at' | 'tag_id'
// }
// export const getItemsSummaryApi = <T>({ start, end, kind, group_by }: GetKeyParams) => {
//   const { data } = useSWR(`/api/v1/items/summary?happened_after=${start.format('yyyy-MM-dd')}&happened_before=${end.format('yyyy-MM-dd')}&kind=${kind}&group_by=${group_by}`,
//     async (path) => {
//       const response = await http.get<{ groups: T; total: number }>(path)
//       return response.data
//     })
//   return {
//     data
//   }
// }
export const getTagApi = (tagId: string) => {
  const { data } = useSWR(tagId ? `/api/v1/tags/${tagId}` : null, async (path) => {
    const response = await http.get<Resource<Tag>>(path)
    return response.data.resource
  })
  return { data }
}

export const getTagsApi = (tagKind: string) => {
  const getKey = (pageIndex: number, prev: Resources<Item>) => {
    const { pager, resources } = prev || {}
    if (pager && (pager.page - 1) * pager.per_page + resources.length >= pager.count) {
      return null
    }
    return `/api/v1/tags?page=${pageIndex + 1}&kind=${tagKind}`
  }
  const { data, error, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    async (path) => {
      const response = await http.get<Resources<Tag>>(path)
      return response.data
    },
    { revalidateAll: true }
  )

  let hasMore
  let last: Resources<Tag> = { resources: [], pager: { page: 0, per_page: 0, count: 0 } }
  const onLoadMore = () => setSize(size + 1)
  const isLoadingMore = data?.[size - 1] === undefined && !error

  if (data) {
    last = data[data.length - 1]
    const { page, per_page, count } = last.pager
    hasMore = (page - 1) * per_page + last.resources.length < count
  }

  return {
    data, error, isLoading, onLoadMore, isLoadingMore, hasMore, last
  }
}

export const createTagApi = (data: Partial<Tag>) => http.post<Resource<Tag>>('/api/v1/tags', data)

export const updateTagApi = (tagId: string, data: Partial<Tag>) =>
  http.patch<Resource<Tag>>(`/api/v1/tags/${tagId}`, data)

export const deleteTagApi = (tagId: string) => http.delete(`/api/v1/tags/${tagId}`)
