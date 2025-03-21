import { Resource, ResourceType, Utils } from '@decentm/concourse-ts'
import * as Git from '@decentm/concourse-ts-resource-git'

import { git_resource_type } from '../resource-types/git.js'

export const git_repo_code: Git.Resource = new Resource(
  'git_code',
  git_resource_type,
  (r) => {
    r.source = {
      uri: 'https://github.com/DecentM/etue',
      branch: 'main',
      ignore_paths: ['.ci', 'packages/ci'],
    }
  }
)

export const git_repo_ci: Git.Resource = new Resource('git_ci', git_resource_type, (r) => {
  r.source = {
    uri: 'https://github.com/DecentM/etue',
    branch: 'main',
    paths: ['.ci', 'packages/ci'],
  }
})
