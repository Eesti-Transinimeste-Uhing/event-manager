import { FluentBundle, FluentResource } from '@fluent/bundle'
import { SupportedLanguages } from 'src/stores/i18n'

import enGbMessages from '../locales/en-GB.ftl?raw'
import etEeMessages from '../locales/et-EE.ftl?raw'

export const enGbBundle = new FluentBundle('en-GB')
enGbBundle.addResource(new FluentResource(enGbMessages))

export const etEeBundle = new FluentBundle('et-EE')
etEeBundle.addResource(new FluentResource(etEeMessages))

export const getI18nBundle = (lang: SupportedLanguages) => {
  switch (lang) {
    case 'en-GB':
      return enGbBundle
    case 'et-EE':
      return etEeBundle
  }
}
