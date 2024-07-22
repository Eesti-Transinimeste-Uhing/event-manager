import { defineStore } from 'pinia'
import { SupportedLanguages } from 'src/graphql/generated/graphql'
import { getBrowserLanguage } from 'src/lib/get-browser-language'

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    language: getBrowserLanguage(),
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
