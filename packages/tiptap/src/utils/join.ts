import { JSONContent } from '@tiptap/core'

export const join = (jsons: JSONContent[]): JSONContent => {
  return {
    type: 'doc',
    content: jsons.flatMap((json) => json.content ?? []),
  }
}
