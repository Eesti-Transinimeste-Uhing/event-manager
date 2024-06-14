import { SupportedLanguages } from '@etu/events-proto/dist/lib'

export const flagMap: Record<SupportedLanguages, string> = {
  [SupportedLanguages.en_GB]: '🇬🇧',
  [SupportedLanguages.et_EE]: '🇪🇪',
  [SupportedLanguages.ru_RU]: '🇷🇺',
}

export const IterableSupportedLanguages = Object.values(SupportedLanguages).filter(
  (lang) => typeof lang === 'number'
) as SupportedLanguages[]
