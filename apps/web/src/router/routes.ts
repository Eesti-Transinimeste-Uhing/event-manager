import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/logged-out.vue'),
    children: [{ path: '', component: () => import('pages/index-page.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/logged-out.vue'),
    children: [{ path: '/auth/login', component: () => import('pages/auth/log-in.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/not-found.vue'),
  },
]

export default routes
