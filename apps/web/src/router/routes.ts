import { config } from 'src/config'
import { RouteRecordRaw } from 'vue-router'

type Meta = {
  auth: 'require' | 'forbid' | 'any'
  dark: boolean
  label: string
  icon: string
  path: RouteRecord[]
}

export type RouteRecord = RouteRecordRaw & {
  meta: Meta
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
    path: [],
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
    path: [templates],
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
    path: [],
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
    path: [forms],
  },
}

export const formSubmit: RouteRecord = {
  name: 'form-submit',
  path: '/form/:id/submit',
  component: () => import('pages/forms/submit-form.vue'),
  meta: {
    auth: 'any',
    dark: false,
    icon: 'las la-edit',
    label: 'Submit form',
    path: [],
  },
}

export const submissionList: RouteRecord = {
  name: 'submission-list',
  path: '/submission/list',
  component: () => import('pages/submissions/submissions-list.vue'),
  meta: {
    auth: 'require',
    dark: true,
    icon: 'las la-stream',
    label: 'Submissions',
    path: [],
  },
}

const indexRoutes: RouteRecord[] = [
  templates,
  forms,
  formEdit,
  templates,
  templateEdit,
  submissionList,
]

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
    path: [],
  },
}

if (config.node.env === 'development') {
  indexRoutes.push(prototyping)
}

export const dashboard: RouteRecord = {
  name: 'dashboard',
  path: '/',
  component: () => import('layouts/app-dashboard.vue'),
  children: indexRoutes,
  meta: {
    auth: 'require',
    dark: true,
    label: 'Dashboard',
    icon: 'las la-pager',
    path: [],
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
    path: [],
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
    path: [],
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
    path: [],
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
    path: [],
  },
}

export const publicRoute: RouteRecord = {
  name: 'public',
  path: '/public',
  component: () => import('layouts/public-layout.vue'),
  children: [formSubmit],
  meta: {
    auth: 'any',
    dark: false,
    label: 'Public',
    icon: 'las la-globe',
    path: [],
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
    path: [],
  },
}

export const routes: RouteRecord[] = [
  dashboard,
  auth,
  publicRoute,

  // Always leave this as last one,
  // but you can also remove it
  catchAll,
]
