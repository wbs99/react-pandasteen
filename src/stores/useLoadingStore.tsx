import { create } from 'zustand'

type Loading = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useLoadingStore = create<Loading>(set => ({
  visible: false,
  setVisible: (visible: boolean) => set({ visible })
}))
