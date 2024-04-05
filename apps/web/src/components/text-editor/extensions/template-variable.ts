import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import TemplateVariableRenderer from './template-variable.vue'

export const TemplateVariableId = {
  'event-date-time': 'Event Date and Time',
  'event-location': 'Event Location',
  'description-slot': 'Description Slot',
} as const

export type TemplateVariableId = (typeof TemplateVariableId)[keyof typeof TemplateVariableId]

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
