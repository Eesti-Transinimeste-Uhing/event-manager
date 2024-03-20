import { RouteRecordRaw } from 'vue-router'

export type RouteRecord = RouteRecordRaw & {
  meta: {
    auth: 'require' | 'forbid' | 'any'
    dark: boolean
    label: string
    icon: string
    layout: 'none' | 'app-dashboard' | 'single-modal'
  }
}

export const indexDashboard: RouteRecord = {
  name: 'dashboard',
  path: '/dashboard',
  component: () => import('pages/index-page.vue'),
  meta: {
    auth: 'require',
    dark: true,
    label: 'Dashboard',
    icon: 'las la-pager',
    layout: 'app-dashboard',
  },
}

export const index: RouteRecord = {
  name: 'index',
  path: '/',
  component: () => import('layouts/app-dashboard.vue'),
  children: [indexDashboard],
  meta: {
    auth: 'require',
    dark: true,
    label: 'Index',
    icon: 'las la-pager',
    layout: 'none',
  },
}

export const authLogin: RouteRecord = {
  name: 'authLogin',
  path: '/auth/login',
  component: () => import('pages/auth/log-in.vue'),
  meta: {
    auth: 'forbid',
    dark: false,
    label: 'Log in',
    icon: 'las la-user',
    layout: 'single-modal',
  },
}

export const authSuccess: RouteRecord = {
  name: 'authSuccess',
  path: '/auth/success',
  component: () => import('pages/auth/auth-success.vue'),
  meta: {
    auth: 'forbid',
    dark: false,
    label: 'Discord success callback',
    icon: 'lab la-discord',
    layout: 'single-modal',
  },
}

export const authFailure: RouteRecord = {
  name: 'authFailure',
  path: '/auth/failure',
  component: () => import('pages/auth/auth-failure.vue'),
  meta: {
    auth: 'forbid',
    dark: false,
    label: 'Discord failure callback',
    icon: 'lab la-discord',
    layout: 'single-modal',
  },
}

export const auth: RouteRecord = {
  name: 'auth',
  path: '/auth',
  component: () => import('layouts/single-modal.vue'),
  children: [authLogin, authSuccess, authFailure],
  meta: {
    auth: 'forbid',
    dark: false,
    label: 'Authentication',
    icon: 'las la-user',
    layout: 'none',
  },
}

export const catchAll: RouteRecord = {
  name: 'catchAll',
  path: '/:catchAll(.*)*',
  component: () => import('pages/not-found.vue'),
  meta: {
    auth: 'forbid',
    dark: true,
    label: 'Not Found',
    icon: 'las la-question-circle',
    layout: 'single-modal',
  },
}

export const routes: RouteRecord[] = [
  index,
  auth,

  // Always leave this as last one,
  // but you can also remove it
  catchAll,
]
