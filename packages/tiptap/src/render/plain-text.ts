import { JSONContent } from '@tiptap/core'
import { DateTimeArg, TiptapRenderer } from './base'
import { DateTime } from 'luxon'

class PlainTextRenderer extends TiptapRenderer {
  public renderJsonContent(json: JSONContent): string {
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
      result += '\n'
      return result
    }

    if (json.type === 'text') {
      if (json.text) result += json.text

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

export const plainTextRenderer = new PlainTextRenderer()
