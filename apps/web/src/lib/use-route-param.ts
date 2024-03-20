import { useRoute } from 'vue-router'

export const useRouteParam = (param: string) => {
  const route = useRoute()
  const value = route.params[param]

  return Array.isArray(value) ? value[0] : value
}
