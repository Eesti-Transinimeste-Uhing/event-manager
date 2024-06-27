import { JSONContent } from '@tiptap/core'
import { escape } from 'html-escaper'

import { hasMark } from './utils'
import { DateTimeArg, TiptapRenderer } from './base'
import { DateTime } from 'luxon'

class HtmlRenderer extends TiptapRenderer {
  public renderJsonContent(json: JSONContent): string {
    let result = ''

    if (json.type === 'doc' && json.content) {
      for (const node of json.content) {
        result += this.renderJsonContent(node)
      }

      return result
    }

    if (json.type === 'paragraph') {
      result += '<p>'

      if (json.content)
        for (const node of json.content) {
          result += this.renderJsonContent(node)
        }

      result += '</p>'
      return result
    }

    if (json.type === 'hardBreak') {
      result += '<br>'
      return result
    }

    if (json.type === 'text') {
      const b = hasMark(json, 'bold')
      const i = hasMark(json, 'italic')

      if (b) result += '<b>'
      if (i) result += '<i>'

      if (json.text) result += escape(json.text)

      if (i) result += '</i>'
      if (b) result += '</b>'

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

export const htmlRenderer = new HtmlRenderer()
