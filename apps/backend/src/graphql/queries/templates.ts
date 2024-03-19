import { connectionPlugin, queryField } from 'nexus'
import { templateController } from '../../server/static-context'

export const TemplatesQuery = queryField((t) => {
  t.connectionField('templates', {
    type: 'Template',
    async cursorFromNode(node, args, ctx, info, { index, nodes }) {
      if (args.last && !args.before) {
        const totalCount = await templateController.count()

        return `cursor:${totalCount - args.last! + index + 1}`
      }

      return connectionPlugin.defaultCursorFromNode(node, args, ctx, info, {
        index,
        nodes,
      })
    },
    nodes(root, args, context) {
      return templateController.listAll()
    },
  })
})
