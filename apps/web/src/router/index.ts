import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { RouteRecord, authLogin, routes } from './routes'
import { Dark } from 'quasar'
import { apolloClient } from 'src/graphql/apollo/client'
import { gql } from '@apollo/client/core'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  if (typeof window === 'undefined') {
    return router
  }

  router.afterEach((to) => {
    setTimeout(() => {
      Dark.set((to as unknown as RouteRecord).meta.dark)
    }, 0)

    if (typeof window === 'undefined' || (to as unknown as RouteRecord).meta.auth !== 'require')
      return

    const result = apolloClient.readQuery({
      query: gql`
        query AuthRouteGuard {
          viewer {
            id
          }
        }
      `,
    })

    if (result?.viewer) return

    setTimeout(() => {
      router.push({ name: authLogin.name })
    }, 0)
  })

  return router
})
