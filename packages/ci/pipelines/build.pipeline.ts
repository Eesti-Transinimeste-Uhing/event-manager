import * as ConcourseTs from '@decentm/concourse-ts'
import * as Concourse from '@decentm/concourse-ts-fluent'

const resource_type = new ConcourseTs.ResourceType('example', (rt) => {
  rt.set_type('registry-image')

  rt.source = {
    repository: 'concourse/registry-image-resource',
    tag: '1',
  }
})

const alpine_resource = new ConcourseTs.Resource('example', resource_type, (r) => {
  r.source = {
    repository: 'alpine',
    tag: 'latest',
  }
})

export default new Concourse.PipelineBuilder()
  .name('build')
  .job((job) =>
    job
      .name('quasar-build')
      .step((step) =>
        step.task((step) =>
          step
            .name('say-hello')
            .task((task) =>
              task.image_resource(alpine_resource).run((command) => command.path('echo').arg('Hi'))
            )
        )
      )
  )
  .build()
