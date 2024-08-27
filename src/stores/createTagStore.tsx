import type { Tag } from '../apis/tagApi'
import type { FormError } from '../utils/validate'
import { createImmerStore } from './createImmerStore'

type Data = Tag
type CreateTagStore = {
  data: Partial<Data>
  setData: (data: Partial<Data>) => void
  error: FormError<Data>
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateTagStore = createImmerStore<CreateTagStore>(set => ({
  data: {
    kind: 'expenses',
    sign: '',
    name: ''
  },
  setData: data => set(
    (state) => {
      Object.assign(state.data, data)
    },
  ),
  error: {
    kind: [],
    sign: [],
    name: []
  },
  setError: error => set(
    (state) => {
      Object.assign(state.error, {
        kind: [],
        sign: [],
        name: []
      })
      Object.assign(state.error, error)
    },
  ),
}))
