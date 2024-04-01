import { config } from 'src/config'
import { RouteRecordRaw } from 'vue-router'

export type RouteRecord = RouteRecordRaw & {
  meta: {
    auth: 'require' | 'forbid' | 'any'
    dark: boolean
    label: string
    icon: string
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
  },
}

export const templates: RouteRecord = {
  name: 'template-list',
  path: '/template/list',
  component: () => import('pages/templates/templates-list.vue'),
  meta: {
    auth: 'require',
    dark: true,
    icon: 'las la-file',
    label: 'Templates',
  },
}

export const templateEdit: RouteRecord = {
  name: 'template-edit',
  path: '/template/:id/edit',
  component: () => import('pages/templates/edit-template.vue'),
  meta: {
    auth: 'require',
    dark: true,
    icon: 'las la-edit',
    label: 'Edit template',
  },
}

export const forms: RouteRecord = {
  name: 'forms',
  path: '/form/list',
  component: () => import('pages/forms/forms-list.vue'),
  meta: {
    auth: 'require',
    dark: true,
    icon: 'las la-file-alt',
    label: 'Forms',
  },
}

export const formEdit: RouteRecord = {
  name: 'form-edit',
  path: '/form/:id/edit',
  component: () => import('pages/forms/edit-form.vue'),
  meta: {
    auth: 'require',
    dark: true,
    icon: 'las la-edit',
    label: 'Edit form',
  },
}

export const prototyping: RouteRecord = {
  name: 'dev-prototyping',
  path: '/dev-prototyping',
  component: () => import('pages/dev-prototyping.vue'),
  children: [],
  meta: {
    auth: 'any',
    dark: true,
    label: 'Prototyping',
    icon: 'las la-code',
  },
}

const indexRoutes: RouteRecord[] = [indexDashboard, templates, templateEdit, forms, formEdit]

if (config.node.env === 'development') {
  indexRoutes.push(prototyping)
}

export const index: RouteRecord = {
  name: 'index',
  path: '/',
  component: () => import('layouts/app-dashboard.vue'),
  children: indexRoutes,
  meta: {
    auth: 'require',
    dark: true,
    label: 'Index',
    icon: 'las la-pager',
  },
}

export const authLogin: RouteRecord = {
  name: 'authLogin',
  path: '/auth/login',
  component: () => import('pages/auth/log-in.vue'),
  meta: {
    auth: 'any',
    dark: false,
    label: 'Log in',
    icon: 'las la-user',
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
  },
}

export const routes: RouteRecord[] = [
  index,
  auth,

  // Always leave this as last one,
  // but you can also remove it
  catchAll,
]
