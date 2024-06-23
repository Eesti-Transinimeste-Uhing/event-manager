import { JSONContent } from '@tiptap/core'

import { hasMark } from './utils'

export const markdown = (json: JSONContent): string => {
  let result = ''

  if (json.type === 'doc' && json.content) {
    for (const node of json.content) {
      result += markdown(node)
    }

    return result
  }

  if (json.type === 'paragraph') {
    result += '\n'

    if (json.content)
      for (const node of json.content) {
        result += markdown(node)
      }

    result += '\n'
    return result
  }

  if (json.type === 'hardBreak') {
    result += ' \n'
    return result
  }

  if (json.type === 'text') {
    const b = hasMark(json, 'bold')
    const i = hasMark(json, 'italic')

    if (b) result += '**'
    if (i) result += '*'

    if (json.text) result += json.text

    if (i) result += '*'
    if (b) result += '**'

    return result
  }

  return result
}
