import { JSONContent } from '@tiptap/core'
import { TemplateVariableId } from '../extensions/template-variable'

import { hasMark } from './utils'
import { RenderData } from '.'
import { DateTime } from 'luxon'

export const markdown = (json: JSONContent, data: RenderData): string => {
  let result = ''

  if (json.type === 'doc' && json.content) {
    for (const node of json.content) {
      result += markdown(node, data)
    }

    return result
  }

  if (json.type === 'paragraph') {
    result += '\n'

    if (json.content)
      for (const node of json.content) {
        result += markdown(node, data)
      }

    result += '\n'
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
