import { FluentBundle } from '@fluent/bundle'
import { SupportedLanguages } from 'src/graphql/generated/graphql'

const map: Record<SupportedLanguages, () => Promise<FluentBundle>> = {
  [SupportedLanguages.EnGb]: async () => (await import('./bundles/en-GB')).bundle,
  [SupportedLanguages.EtEe]: async () => (await import('./bundles/et-EE')).bundle,
  [SupportedLanguages.RuRu]: async () => (await import('./bundles/ru-RU')).bundle,
}

export const getI18nBundles = async (lang: SupportedLanguages): Promise<FluentBundle[]> => {
  const bundles = []

  bundles.push(await map[lang]())

  if (lang !== SupportedLanguages.EnGb) {
    bundles.push(await map[SupportedLanguages.EnGb]())
  }

  return bundles
}
