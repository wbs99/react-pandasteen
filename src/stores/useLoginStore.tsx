import { FormError } from "../lib/validate"
import { LoginData } from "../api/types"
import { create } from "zustand"


interface Login {
  data: LoginData
  error: FormError<LoginData>
  setData: (data: Partial<LoginData>) => void
  setError: (error: Partial<FormError<LoginData>>) => void
}

export const useLoginStore = create<Login>((set) => ({
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