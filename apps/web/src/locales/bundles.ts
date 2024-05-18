import { FluentBundle } from '@fluent/bundle'
import { SupportedLanguages } from 'src/graphql/generated/graphql'

const map: Record<SupportedLanguages, () => Promise<FluentBundle>> = {
  en_GB: async () => (await import('./bundles/en-GB')).bundle,
  et_EE: async () => (await import('./bundles/et-EE')).bundle,
  ru_RU: async () => (await import('./bundles/ru-RU')).bundle,
}

export const getI18nBundles = async (lang: SupportedLanguages): Promise<FluentBundle[]> => {
  const bundles = []

  bundles.push(await map[lang]())

  if (lang !== 'en_GB') {
    bundles.push(await map['en_GB']())
  }

  return bundles
}
