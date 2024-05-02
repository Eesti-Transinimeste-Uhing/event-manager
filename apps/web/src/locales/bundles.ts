import { FluentBundle } from '@fluent/bundle'
import { SupportedLanguages } from 'src/stores/i18n'

const map: Record<SupportedLanguages, () => Promise<FluentBundle>> = {
  'en-GB': async () => (await import('./bundles/en-GB')).bundle,
  'et-EE': async () => (await import('./bundles/et-EE')).bundle,
  'ru-RU': async () => (await import('./bundles/ru-RU')).bundle,
}

export const getI18nBundles = async (lang: SupportedLanguages): Promise<FluentBundle[]> => {
  const bundles = []

  bundles.push(await map[lang]())

  if (lang !== 'en-GB') {
    bundles.push(await map['en-GB']())
  }

  return bundles
}
