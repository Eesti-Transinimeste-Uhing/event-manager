import { Resource, ResourceType } from '@decentm/concourse-ts'
import * as Git from '@decentm/concourse-ts-resource-git'

import { git_resource_type } from '../resource-types/git'

export const git_repo_code: Git.Resource = new Resource(
  'git',
  git_resource_type as ResourceType,
  (r) => {
    r.source = {
      uri: 'https://github.com/DecentM/etue',
      branch: 'main',
      ignore_paths: ['.ci', 'packages/ci'],
    }
  }
)

export const git_repo_ci = new Resource('git', git_resource_type as ResourceType, (r) => {
  r.source = {
    uri: 'https://github.com/DecentM/etue',
    branch: 'main',
    paths: ['.ci', 'packages/ci'],
  }
})
