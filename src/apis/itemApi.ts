import type { Time } from '../utils/time'
import type { User } from './meApi'
import type { Tag } from './tagApi'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { http } from '../utils/http'

export type Item = {
  id: number
  user_id: number
  amount: number
  note?: string
  tag_ids: number[]
  tags?: Tag[]
  happen_at: string
  created_at: string
  updated_at: string
  kind: 'expenses' | 'income'
  deleted_at?: string
}
export type ItemParams = Partial<Item>

export const getItemsApi = (meData?: User) => {
  const { data, error, isLoading } = useSWR(
    meData ? '/api/v1/items' : null,
    async (path) => {
      const response = await http.get<Resources<Item>>(path)
      return response.data
    }
  )

  return { itemsData: data, itemsError: error, isLoadingItems: isLoading }
}

// let itemsParams = {}

// export const getItemListApi = (start: Time, end: Time) => {
//   const { data, error, size, setSize, isLoading } = useSWRInfinite(
//     (pageIndex: number, prev: Resources<Item>) => {
//       const { pager, resources } = prev || {}
//       if (pager && (pager.page - 1) * pager.per_page + resources.length >= pager.count) {
//         return null
//       }

//       itemsParams = {
//         page: pageIndex + 1,
//         happened_after: start.removeTime().isoString,
//         happened_before: end.removeTime().isoString
//       }
//       return ['/api/v1/items', itemsParams]
//     },
//     async ([path, itemsParams]) => {
//       const response = await http.get<Resources<Item>>(path, itemsParams)
//       return response.data
//     },
//     { revalidateAll: true }
//   )
//   let hasMore
//   const onLoadMore = () => setSize(size + 1)
//   const isLoadingMore = data?.[size - 1] === undefined && !error
//   if (data) {
//     const last = data[data.length - 1]
//     const { page, per_page, count } = last.pager
//     hasMore = (page - 1) * per_page + last.resources.length < count
//   }

//   return {
//     data, error, isLoading, onLoadMore, isLoadingMore, hasMore
//   }
// }

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
  const { data } = useSWR(
    start && end && `/api/v1/items/balance?happened_after=${start.isoString}&happened_before=${end.isoString}`,
    async (path) => {
      const response = await http.get<{ balance: number; expenses: number; income: number }>(path)
      return response.data
    }
  )

  return { itemsBalanceData: data }
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
