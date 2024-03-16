import { RouteRecordRaw } from 'vue-router'

export type RouteRecord = RouteRecordRaw & {
  meta: {
    auth: boolean
    dark: boolean
    label: string
    icon: string
  }
}

export const index: RouteRecord = {
  name: 'index',
  path: '/',
  component: () => import('layouts/app-dashboard.vue'),
  children: [{ path: 'dashboard', component: () => import('pages/index-page.vue') }],
  meta: {
    auth: true,
    dark: true,
    label: 'Dashboard',
    icon: 'las la-pager',
  },
}

export const authLogin: RouteRecord = {
  name: 'authLogin',
  path: '/auth/login',
  component: () => import('pages/auth/log-in.vue'),
  meta: {
    auth: false,
    dark: false,
    label: 'Log in',
    icon: 'las la-user',
  },
}

export const authDiscordSuccess: RouteRecord = {
  name: 'authDiscordSuccess',
  path: '/auth/discord/success',
  component: () => import('pages/auth/discord-success.vue'),
  meta: {
    auth: false,
    dark: false,
    label: 'Discord success callback',
    icon: 'lab la-discord',
  },
}

export const authDiscordFailure: RouteRecord = {
  name: 'authDiscordFailure',
  path: '/auth/discord/failure',
  component: () => import('pages/auth/discord-failure.vue'),
  meta: {
    auth: false,
    dark: false,
    label: 'Discord failure callback',
    icon: 'lab la-discord',
  },
}

export const auth: RouteRecord = {
  name: 'auth',
  path: '/auth',
  component: () => import('layouts/single-modal.vue'),
  children: [authLogin, authDiscordSuccess, authDiscordFailure],
  meta: {
    auth: false,
    dark: false,
    label: 'Authentication',
    icon: 'las la-user',
  },
}

export const catchAll: RouteRecord = {
  name: 'catchAll',
  path: '/:catchAll(.*)*',
  component: () => import('pages/not-found.vue'),
  meta: {
    auth: false,
    dark: true,
    label: 'Not Found',
    icon: 'las la-question-circle',
  },
}

export const routes: RouteRecord[] = [
  index,
  auth,

  // Always leave this as last one,
  // but you can also remove it
  catchAll,
]
