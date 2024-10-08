import type { Item } from '../apis/itemApi'
import type { FormError } from '../utils/validate'
import { time } from '../utils/time'
import { createImmerStore } from './createImmerStore'

type Data = Item
type CreateItemStore = {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateItemStore = createImmerStore<CreateItemStore>(set => ({
  data: {
    kind: 'expenses',
    tag_ids: [],
    happen_at: time().isoString,
    amount: 0
  },
  setData: data => set(
    (state) => {
      Object.assign(state.data, data)
    },
  ),
  error: {
    kind: [],
    tag_ids: [],
    happen_at: [],
    amount: []
  },
  setError: error => set(
    (state) => {
      Object.assign(state.error, {
        kind: [],
        tag_ids: [],
        happen_at: [],
        amount: []
      })
      Object.assign(state.error, error)
    },
  ),
}))
