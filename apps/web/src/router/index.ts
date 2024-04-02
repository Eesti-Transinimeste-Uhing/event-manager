import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import { routes, RouteRecord, authLogin, authFailure, dashboard } from './routes'
import { apolloClient } from 'src/graphql/apollo/client'
import { gql } from '@apollo/client/core'
import { nextTick } from 'vue'

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

  router.beforeResolve(async (_to) => {
    const to = _to as unknown as RouteRecord

    if (to.meta.auth === 'any') {
      return
    }

    if (typeof window === 'undefined') {
      return
    }

    nextTick(async () => {
      const { data, errors } = await apolloClient.query({
        fetchPolicy: 'cache-first',
        errorPolicy: 'ignore',
        query: gql`
          query AuthRouteGuard {
            viewer {
              id
            }
          }
        `,
      })

      if (errors && errors.length > 0) {
        return router.push({
          name: authFailure.name,
          query: {
            message: errors.map((error) => error.message).join('\n'),
          },
        })
      }

      if (to.meta.auth === 'require' && !data.viewer) {
        return router.push(authLogin)
      }

      if (to.meta.auth === 'forbid' && data.viewer) {
        return router.push(dashboard)
      }
    })

    return
  })

  return router
})
