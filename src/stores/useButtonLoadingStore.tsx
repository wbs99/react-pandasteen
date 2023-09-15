import { create } from 'zustand'

type ButtonLoading = {
  buttonLoading: boolean
  starButtonLoading: () => void
  closeButtonLoading: () => void
}

export const useButtonLoadingStore = create<ButtonLoading>(set => ({
  buttonLoading: false,
  starButtonLoading: () => set({ buttonLoading: true }),
  closeButtonLoading: () => set({ buttonLoading: false })
}))
