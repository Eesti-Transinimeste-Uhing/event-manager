import { onMounted, watch } from 'vue'
import { QuasarLanguage, useQuasar } from 'quasar'

import { useI18nStore } from '../../stores/i18n'
import { useI18n } from '../../hooks/use-i18n'

import { SupportedLanguages } from '../../graphql/generated/graphql'

const importMap: Record<SupportedLanguages, () => Promise<QuasarLanguage>> = {
  en_GB: async () => (await import('quasar/lang/en-GB')).default,
  et_EE: async () => (await import('quasar/lang/et')).default,
  ru_RU: async () => (await import('quasar/lang/ru')).default,
}

let initialised = false

export const useAppI18n = () => {
  if (initialised) return

  initialised = true

  const q = useQuasar()

  const languagesStore = useI18nStore()
  const { changeLanguage, currentLanguage } = useI18n()

  const updateQuasarLanguage = async (newLang: SupportedLanguages) => {
    q.lang.set(await importMap[newLang]())
  }

  watch(currentLanguage, updateQuasarLanguage)

  onMounted(() => {
    changeLanguage(languagesStore.currentLanguage)
    updateQuasarLanguage(languagesStore.currentLanguage)
  })
}
