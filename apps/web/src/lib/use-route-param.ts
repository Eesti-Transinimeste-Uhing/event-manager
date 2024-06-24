import { useRoute } from 'vue-router'

export const useRouteQuery = (name: string) => {
  const route = useRoute()
  const value = route.query[name]
  const firstValue = Array.isArray(value) ? value[0] : value

  return firstValue ? firstValue : ''
}
