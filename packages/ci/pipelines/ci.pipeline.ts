import * as Concourse from '@decentm/concourse-ts-fluent'
import { git_repo_ci } from '../resources/git-repo'

export default new Concourse.PipelineBuilder()
  .name('ci')
  .job((job) => {
    job
      .name('set-pipeline')
      .step((step) => {
        step.get((get) => {
          get.name('repo').trigger().get(git_repo_ci)
        })
      })
      .step((step) => {
        step.set_pipeline((set_pipeline_step) => {
          set_pipeline_step.name('set-pipeline').pipeline('ci').file('.ci/pipeline/ci.yml')
        })
      })
  })
  .build()
