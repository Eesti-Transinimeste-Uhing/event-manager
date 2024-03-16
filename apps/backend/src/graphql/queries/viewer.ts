import { queryField } from 'nexus'
import { UserRepository } from '../../repository/user'

export const ViewerQuery = queryField((t) => {
  t.field('viewer', {
    type: 'User',
    resolve(root, args) {
      return UserRepository.findOne({})
    },
  })
})
