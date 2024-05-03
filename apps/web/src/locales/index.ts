import { createFluentVue } from 'fluent-vue'
import { bundle } from './bundles/en-GB'

export const fluent = createFluentVue({
  bundles: [bundle],
})
