import { queryField } from 'nexus'
import { templateController } from '../../server/static-context'

export const TemplatesQuery = queryField((t) => {
  t.connectionField('templates', {
    type: 'Template',
    resolve(root, args) {
      return templateController.paginate(args)
    },
  })
})
