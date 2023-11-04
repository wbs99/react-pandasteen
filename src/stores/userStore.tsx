import { createImmerStore } from './createImmerStore'

type UserStore = {
  user: User
  updateUser: (user: Partial<User>) => void

}

export const useUserStore = createImmerStore<UserStore>(set => ({
  user: {
    id: 1,
    email: '1134954328@qq.com',
    name: 'good',
    created_at: '2023-11-04',
    updated_at: '2023-11-04'
  },
  updateUser: user => set(
    (state) => {
      Object.assign(state.user, user)
    },
  ),
}))
