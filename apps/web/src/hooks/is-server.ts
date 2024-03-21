import { onMounted, ref } from 'vue'

export const useIsServer = () => {
  const isServer = ref(true)

  onMounted(() => {
    isServer.value = false
  })

  return {
    isServer,
  }
}
