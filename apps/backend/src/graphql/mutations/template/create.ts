import { mutationField } from 'nexus'
import { templateController } from '../../../server/static-context'

export const CreateTemplate = mutationField((t) => {
  t.field('createTemplate', {
    type: 'Template',
    resolve(root, args, context) {
      return templateController.createNew()
    },
  })
})
