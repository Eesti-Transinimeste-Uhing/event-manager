import { defineStore } from 'pinia'

export const SupportedLanguages = {
  enGb: 'en-GB',
  etEe: 'et-EE',
} as const

export type SupportedLanguages = (typeof SupportedLanguages)[keyof typeof SupportedLanguages]

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    language: SupportedLanguages.enGb as SupportedLanguages,
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
