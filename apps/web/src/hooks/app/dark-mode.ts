import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useUserPreferencesStore } from 'src/stores/user-preferences'
import { onMounted, watch } from 'vue'

let initialised = false

export const useAppDarkMode = () => {
  if (initialised) return

  initialised = true

  const store = useUserPreferencesStore()
  const q = useQuasar()
  const { darkMode } = storeToRefs(store)

  watch(darkMode, (newDarkMode): void => {
    q.dark.set(newDarkMode)
  })

  onMounted(() => q.dark.set(darkMode.value))
}
