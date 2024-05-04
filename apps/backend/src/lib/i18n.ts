export const SupportedLanguages = {
  et_EE: 'et_EE',
  en_GB: 'en_GB',
  ru_RU: 'ru_RU',
} as const

export type SupportedLanguages = (typeof SupportedLanguages)[keyof typeof SupportedLanguages]
