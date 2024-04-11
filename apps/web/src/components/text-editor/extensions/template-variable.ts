import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import TemplateVariableRenderer from './template-variable.vue'

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

  addNodeView() {
    return VueNodeViewRenderer(TemplateVariableRenderer)
  },

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
