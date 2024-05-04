import { Node } from '@tiptap/vue-3'

export const TemplateVariableId = {
  'event-date-time': 'event-date-time',
  'event-location': 'event-location',
  'description-slot': 'description-slot',
} as const

export const TemplateVariableNode = Node.create({
  name: 'template-variable',

  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,

  renderHTML({ node }) {
    const vars = this.editor?.storage['template-values'] ?? {}

    return vars[node.attrs.id] ?? ''
  },

  renderText() {
    return ''
  },

  addAttributes() {
    return {
      id: {
        default: '',
      },
    }
  },
})
