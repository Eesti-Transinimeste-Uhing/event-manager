import { createFluentVue } from 'fluent-vue'

import { etEeBundle } from './bundles'

export const fluent = createFluentVue({
  bundles: [etEeBundle],
})
