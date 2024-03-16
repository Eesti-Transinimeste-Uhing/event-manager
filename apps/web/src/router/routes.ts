import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/single-modal.vue'),
    children: [{ path: '', component: () => import('pages/index-page.vue') }],
  },
  {
    path: '/auth',
    component: () => import('layouts/single-modal.vue'),
    children: [
      { path: '/auth/login', component: () => import('pages/auth/log-in.vue') },
      { path: '/auth/discord/success', component: () => import('pages/auth/discord-success.vue') },
      { path: '/auth/discord/failure', component: () => import('pages/auth/discord-failure.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/not-found.vue'),
  },
]

export default routes
