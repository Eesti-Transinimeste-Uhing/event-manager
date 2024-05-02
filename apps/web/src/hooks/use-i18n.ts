import { useFluent } from 'fluent-vue'

import { getI18nBundles } from 'src/locales/bundles'
import { SupportedLanguages, useI18nStore } from 'src/stores/i18n'
import { toRefs } from 'vue'

export const useI18n = () => {
  const { $t, bundles } = useFluent()
  const store = useI18nStore()
  const { currentLanguage } = toRefs(store)

  const changeLanguage = (newLanguage: SupportedLanguages) => {
    if (store.currentLanguage !== newLanguage) {
      store.set(newLanguage)
    }

    bundles.value = getI18nBundles(newLanguage)
  }

  return { t: $t, changeLanguage, currentLanguage }
}
