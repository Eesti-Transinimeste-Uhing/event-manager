import { JSONContent } from '@tiptap/core'

export const json = (content: JSONContent): string => {
  return JSON.stringify(content)
}
