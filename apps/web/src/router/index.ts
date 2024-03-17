import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { routes, RouteRecord } from './routes'
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

  router.beforeEach(async (_to) => {
    const to = _to as unknown as RouteRecord

    const { data } = await apolloClient.query({
      fetchPolicy: 'cache-first',
      query: gql`
        query {
          viewer {
            id
          }
        }
      `,
    })

    if (to.meta.auth && !data.viewer) {
      return {
        path: '/auth/login',
      }
    }

    if (!to.meta.auth && data.viewer) {
      return {
        path: '/',
      }
    }
  })

  return router
})
