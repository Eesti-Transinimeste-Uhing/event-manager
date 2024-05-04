import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { TemplateVariableNode } from '@etu/tiptap'

import TemplateVariableRenderer from './template-variable.vue'

export const TemplateVariableNodeWithRenderer = TemplateVariableNode.extend({
  addNodeView() {
    return VueNodeViewRenderer(TemplateVariableRenderer)
  },
})
