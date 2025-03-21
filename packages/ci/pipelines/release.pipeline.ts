import * as Concourse from '@decentm/concourse-ts'
import { create_auto_pipeline } from '@decentm/concourse-ts-recipe-auto-pipeline'
import * as Git from '@decentm/concourse-ts-resource-git'
import commands from '../commands/index.js'

import { git_repo_ci, git_repo_code } from '../resources/git-repo.js'

const auto_pipeline = create_auto_pipeline({
  path: '.ci/pipeline/ci.yml',
  resource: git_repo_ci,
})

const registry_image = new Concourse.ResourceType('registry-image', (rt) => {
  rt.set_type('registry-image')

  rt.source = {
    repository: 'concourse/registry-image-resource',
    tag: '1',
  }
})

const alpine_resource = new Concourse.Resource('alpine', registry_image, (r) => {
  r.source = {
    repository: 'alpine',
    tag: 'latest',
  }
})

export default new Concourse.Pipeline('etu-event-manager', (pipeline) => {
  pipeline.add_job(new Concourse.Job('build', (example_job) => {
    example_job.add_step(new Concourse.GetStep<Git.Source, Git.PutParams, Git.GetParams>('get-repo', (step) => {
      step.set_get(git_repo_code)
      step.trigger = true
    }))

    example_job.add_step(new Concourse.Task('build-task', (example_task) => {
      example_task.platform = 'linux'
      example_task.set_image_resource(alpine_resource)

      example_task.run = commands.quasar.build
    }).as_task_step())
  }))
})
