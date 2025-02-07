import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { http } from '../utils/http'
import type { Item } from './itemApi'

export type Tag = {
  id: number
  kind: Item['kind']
  user_id: number
  name: string
  sign: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}
export type TagParams = Partial<Tag>

export const getTagApi = (tagId: string) => {
  const { data } = useSWR(
    tagId ? `/api/v1/tags/${tagId}` : null,
    async (path) => {
      const response = await http.get<Resource<Tag>>(path)
      return response.data.resource
    }
  )

  return { tagData: data }
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

export const createTagApi = (data: TagParams) => http.post<Resource<Tag>>('/api/v1/tags', data)

export const updateTagApi = (tagId: string, data: TagParams) => http.patch<Resource<Tag>>(`/api/v1/tags/${tagId}`, data)

export const deleteTagApi = (tagId: string) => http.delete(`/api/v1/tags/${tagId}`)
