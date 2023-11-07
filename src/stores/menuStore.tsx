import { createImmerStore } from './createImmerStore'

type Menu = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useMenuStore = createImmerStore<Menu>(set => ({
  visible: false,
  setVisible: visible => set(
    (state) => {
      state.visible = visible
    },
  ),
}))
