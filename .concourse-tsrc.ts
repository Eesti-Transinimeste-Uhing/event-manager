import {rc} from '@decentm/concourse-ts-cli'

export default rc({
  compile: {
    input: 'packages/ci/pipelines/*.pipeline.ts',
    output: '.ci/',
    clean: true,
    project: 'tsconfig.json'
  }
})