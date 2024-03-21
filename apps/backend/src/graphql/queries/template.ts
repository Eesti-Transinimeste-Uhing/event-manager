import { connectionPlugin, queryField } from 'nexus'
import { templateController } from '../../server/static-context'
import { WhereIdInput } from '../types/where-id-input'

export const TemplateQuery = queryField((t) => {
  t.nullable.field('template', {
    type: 'Template',
    args: {
      where: WhereIdInput.asArg(),
    },
    resolve(root, args, context) {
      return templateController.getById(args.where.id)
    },
  })
})
