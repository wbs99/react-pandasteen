import { create } from 'zustand'
import type { LoginData } from '../api/types'
import type { FormError } from '../lib/validate'

type Data = LoginData
type Login = {
  data: Data
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useLoginStore = create<Login>(set => ({
  data: {
    email: '1134954328@qq.com',
    code: '123456',
  },
  error: {
    email: [],
    code: []
  },
  setData: (data) => {
    set(state => ({
      ...state,
      data: { ...state.data, ...data }
    }))
  },
  setError: (error) => {
    set(state => ({
      ...state,
      error
    }))
  }
}))
