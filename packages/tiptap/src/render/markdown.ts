import { JSONContent } from '@tiptap/core'

import { hasMark } from './utils'
import { DateTimeArg, TiptapRenderer } from './base'
import { DateTime } from 'luxon'

class MarkdownRenderer extends TiptapRenderer {
  public override renderJsonContent(json: JSONContent): string {
    let result = ''

    if (json.type === 'doc' && json.content) {
      for (const node of json.content) {
        result += this.renderJsonContent(node)
      }

      return result
    }

    if (json.type === 'paragraph') {
      result += '\n'

      if (json.content)
        for (const node of json.content) {
          result += this.renderJsonContent(node)
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

  public override renderDateTime(dt: DateTime, arg: DateTimeArg): string {
    switch (arg.preset) {
      case 'relative':
        return dt.setLocale(arg.luxonLang).toRelative() || ''
      case 'datetime':
        return dt.setLocale(arg.luxonLang).toLocaleString(DateTime.DATETIME_MED) || ''
    }
  }
}

export const markdownRenderer = new MarkdownRenderer()
