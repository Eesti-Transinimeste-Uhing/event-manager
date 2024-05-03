import { defineStore } from 'pinia'

export const SupportedLanguages = {
  etEe: 'et-EE',
  enGb: 'en-GB',
  ruRu: 'ru-RU',
} as const

export type SupportedLanguages = (typeof SupportedLanguages)[keyof typeof SupportedLanguages]

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    language: SupportedLanguages.etEe as SupportedLanguages,
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
