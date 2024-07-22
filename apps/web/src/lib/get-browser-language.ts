import { SupportedLanguages } from 'src/graphql/generated/graphql'

export const getBrowserLanguage = (): SupportedLanguages => {
  if (typeof navigator === 'undefined') {
    return SupportedLanguages.EnGb
  }

  const language = navigator.language || (navigator as { userLanguage?: string }).userLanguage || ''

  switch (true) {
    case language.startsWith('et'):
      return SupportedLanguages.EtEe
    case language.startsWith('ru'):
      return SupportedLanguages.RuRu
    default:
      return SupportedLanguages.EnGb
  }
}
