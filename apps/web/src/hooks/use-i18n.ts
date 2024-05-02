import { useFluent } from 'fluent-vue'

import { getI18nBundles } from 'src/locales/bundles'
import { SupportedLanguages, useI18nStore } from 'src/stores/i18n'
import { ref, toRefs } from 'vue'

export const useI18n = () => {
  const { $t, bundles } = useFluent()
  const store = useI18nStore()
  const { currentLanguage } = toRefs(store)
  const loading = ref(false)

  const changeLanguage = async (newLanguage: SupportedLanguages) => {
    try {
      loading.value = true

      if (store.currentLanguage !== newLanguage) {
        store.set(newLanguage)
      }

      bundles.value = await getI18nBundles(newLanguage)
    } finally {
      loading.value = false
    }
  }

  return { t: $t, changeLanguage, currentLanguage, loading }
}
