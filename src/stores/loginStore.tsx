import type { FormError } from '../lib/validate'
import { createImmerStore } from './createImmerStore'

type Data = LoginForm
type LoginStore = {
  loginForm: Data
  setLoginForm: (data: Partial<Data>) => void
  loginError: FormError<Data>
  setLoginError: (error: Partial<FormError<Data>>) => void
}

export const useLoginStore = createImmerStore<LoginStore>(set => ({
  loginForm: {
    email: '1134954328@qq.com',
    code: '123456',
  },
  setLoginForm: data => set(
    (state) => {
      Object.assign(state.loginForm, data)
    },
  ),
  loginError: {
    email: [],
    code: []
  },
  setLoginError: error => set(
    (state) => {
      Object.assign(state.loginError, {
        email: [],
        code: []
      })
      Object.assign(state.loginError, error)
    },
  ),
}))
