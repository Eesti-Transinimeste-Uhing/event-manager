import { defineStore } from 'pinia'

export const useUserPreferencesStore = defineStore('user-preferences', {
  state: () => ({
    isDark: false,
  }),
  getters: {
    darkMode: (state) => state.isDark,
  },
  actions: {
    setDarkMode(newDarkMode: boolean) {
      this.isDark = newDarkMode
    },
  },
  persist: true,
})
