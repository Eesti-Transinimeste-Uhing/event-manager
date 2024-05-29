import { JSONContent } from '@tiptap/core'
import { escape } from 'html-escaper'

import { TemplateVariableId } from '../extensions/template-variable'
import { hasMark } from './utils'
import { RenderData } from '.'
import { DateTime } from 'luxon'

export const html = (json: JSONContent, data: RenderData): string => {
  let result = ''

  if (json.type === 'doc' && json.content) {
    for (const node of json.content) {
      result += html(node, data)
    }

    return result
  }

  if (json.type === 'paragraph') {
    result += '<p>'

    if (json.content)
      for (const node of json.content) {
        result += html(node, data)
      }

    result += '</p>'
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

  if (json.type === 'template-variable') {
    if (!json.attrs) {
      return result
    }

    const id: TemplateVariableId = json.attrs.id

    switch (id) {
      case 'event-date-time':
        result += `${DateTime.fromJSDate(data.startsAt).setLocale(data.luxonLang).toLocaleString(DateTime.DATETIME_MED)} (${DateTime.fromJSDate(data.startsAt).setLocale(data.luxonLang).toRelative()})`
        break

      case 'event-location':
        result += data.location
        break
    }

    return result
  }

  return result
}
