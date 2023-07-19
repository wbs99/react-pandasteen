import { create } from "zustand"

interface Local {
  hasReadWelcomes: boolean
  setHadReadWelcome: (read: boolean) => void
}


const init = localStorage.getItem('hasReadWelcome')
export const useLocalStore = create<Local>((set) => ({
  hasReadWelcomes: init === 'yes',
  setHadReadWelcome: (read: boolean) => {
    const result = read ? 'yes' : 'no'
    localStorage.setItem('hasReadWelcome', result)
    set({ hasReadWelcomes: result === 'yes' })
  }
}))