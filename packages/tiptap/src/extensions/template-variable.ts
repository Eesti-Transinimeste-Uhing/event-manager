import { Node, HTMLElement } from '@tiptap/vue-3'

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
    const vars: Record<string, string> = this.editor?.storage['template-values'] ?? {}

    return `<div class="template-variable-wrapper">${vars[node.attrs.id] ?? ''}</div>`
  },

  renderText({ node }) {
    const vars: Record<string, string> = this.editor?.storage['template-values'] ?? {}

    return vars[node.attrs.id] ?? ''
  },

  addAttributes() {
    return {
      id: {
        default: '',
      },
    }
  },

  parseDOM: [
    {
      tag: 'div',
      getAttrs: (dom: HTMLElement) => ({}),
    },
  ],
  toDOM: (node: Node) => ['div', {}],
})
