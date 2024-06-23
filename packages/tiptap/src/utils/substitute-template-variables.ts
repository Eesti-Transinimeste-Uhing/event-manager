import { JSONContent } from '@tiptap/core'
import { DateTime } from 'luxon'

import { TemplateVariableId } from '../extensions/template-variable'
import { RenderData } from '../render'

export const substituteTemplateVariables = (json: JSONContent, data: RenderData): void => {
  if (json.type === 'doc' && json.content) {
    for (const node of json.content) {
      substituteTemplateVariables(node, data)
    }

    return
  }

  if (json.type === 'paragraph') {
    if (json.content)
      for (const node of json.content) {
        substituteTemplateVariables(node, data)
      }

    return
  }

  if (json.type === 'template-variable') {
    if (!json.attrs) {
      return
    }

    const id: TemplateVariableId = json.attrs.id

    switch (id) {
      case 'event-date-time':
        json.text = `${DateTime.fromJSDate(data.startsAt).setLocale(data.luxonLang).toLocaleString(DateTime.DATETIME_MED)} (${DateTime.fromJSDate(data.startsAt).setLocale(data.luxonLang).toRelative()})`
        break

      case 'event-location':
        json.text = data.location
        break
    }

    json.type = 'text'

    Reflect.deleteProperty(json, 'attrs')
    Reflect.deleteProperty(json, 'content')
    Reflect.deleteProperty(json, 'marks')

    return
  }

  return
}
