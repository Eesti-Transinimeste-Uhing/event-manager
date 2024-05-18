import { defineStore } from 'pinia'
import { SupportedLanguages } from 'src/graphql/generated/graphql'

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    language: SupportedLanguages.EtEe,
  }),
  getters: {
    currentLanguage: (state) => state.language,
  },
  actions: {
    set(newLanguage: SupportedLanguages) {
      this.language = newLanguage
    },
  },
  persist: true,
})
