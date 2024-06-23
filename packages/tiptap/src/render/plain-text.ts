import { JSONContent } from '@tiptap/core'

export const plainText = (json: JSONContent): string => {
  let result = ''

  if (json.type === 'doc' && json.content) {
    for (const node of json.content) {
      result += plainText(node)
    }

    return result
  }

  if (json.type === 'paragraph') {
    result += '\n'

    if (json.content)
      for (const node of json.content) {
        result += plainText(node)
      }

    result += '\n'
    return result
  }

  if (json.type === 'hardBreak') {
    result += '\n'
    return result
  }

  if (json.type === 'text') {
    if (json.text) result += json.text

    return result
  }

  return result
}
