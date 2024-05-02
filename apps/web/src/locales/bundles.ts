import { FluentBundle, FluentResource } from '@fluent/bundle'
import { SupportedLanguages } from 'src/stores/i18n'

import enGbMessages from '../locales/en-GB.ftl?raw'
import etEeMessages from '../locales/et-EE.ftl?raw'
import ruRuMessages from '../locales/ru-RU.ftl?raw'

export const enGbBundle = new FluentBundle('en-GB')
enGbBundle.addResource(new FluentResource(enGbMessages))

export const etEeBundle = new FluentBundle('et-EE')
etEeBundle.addResource(new FluentResource(etEeMessages))

export const ruRuBundle = new FluentBundle('ru-RU')
ruRuBundle.addResource(new FluentResource(ruRuMessages))

const map: Record<SupportedLanguages, FluentBundle> = {
  'en-GB': enGbBundle,
  'et-EE': etEeBundle,
  'ru-RU': ruRuBundle,
}

export const getI18nBundles = (lang: SupportedLanguages): FluentBundle[] => {
  return [map[lang], enGbBundle]
}
