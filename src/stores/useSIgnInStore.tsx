import create from "zustand"
import { FormError } from "../lib/validate"

type Data = {
  email: string
  code: string
}
interface SignIn {
  data: Data
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useSignInStore = create<SignIn>((set, get) => (
  {
    data: {
      email: '1134954328@qq.com',
      code: '073316',
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
  }
))