import { ResourceType } from '@decentm/concourse-ts'
import * as Git from '@decentm/concourse-ts-resource-git'

export const git_resource_type: Git.ResourceType = new ResourceType('git', (rt) => {
  rt.set_type('registry-image')

  rt.source = {
    repository: 'concourse/git-resource',
    tag: '1',
  }
})
