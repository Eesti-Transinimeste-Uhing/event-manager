import * as ConcourseTs from '@decentm/concourse-ts'

export const quasar = {
  build: new ConcourseTs.Command((command) => {
    command.path = 'node_modules/.bin/quasar'
    command.add_arg('build')
  })
} as const