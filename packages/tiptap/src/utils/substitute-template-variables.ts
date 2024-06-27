import { JSONContent } from '@tiptap/core'
import { DateTime } from 'luxon'

import { TemplateVariableId } from '../extensions/template-variable'
import { RenderData, RenderTarget } from '../render'
import { TiptapRenderer } from '../render/base'
import { markdownRenderer } from '../render/markdown'
import { htmlRenderer } from '../render/html'
import { discordRenderer } from '../render/discord'
import { plainTextRenderer } from '../render/plain-text'
import { jsonRenderer } from '../render/json'

export const substituteTemplateVariables = (
  json: JSONContent,
  data: RenderData,
  target: RenderTarget
): void => {
  let renderer: TiptapRenderer

  switch (target) {
    case RenderTarget.Markdown:
      renderer = markdownRenderer
      break
    case RenderTarget.Html:
      renderer = htmlRenderer
      break
    case RenderTarget.Discord:
      renderer = discordRenderer
      break
    case RenderTarget.PlainText:
      renderer = plainTextRenderer
      break
    case RenderTarget.Json:
      renderer = jsonRenderer
      break
    default:
      return
  }

  if (json.type === 'doc' && json.content) {
    for (const node of json.content) {
      substituteTemplateVariables(node, data, target)
    }

    return
  }

  if (json.type === 'paragraph') {
    if (json.content)
      for (const node of json.content) {
        substituteTemplateVariables(node, data, target)
      }

    return
  }

  if (json.type === 'template-variable') {
    if (!json.attrs) {
      return
    }

    const id: TemplateVariableId = json.attrs.id

    switch (id) {
      case 'event-date-time': {
        const full = renderer.renderDateTime(DateTime.fromJSDate(data.startsAt), {
          preset: 'datetime',
          luxonLang: data.luxonLang,
        })

        const relative = renderer.renderDateTime(DateTime.fromJSDate(data.startsAt), {
          preset: 'relative',
          luxonLang: data.luxonLang,
        })

        json.text = `${full} (${relative})`
        break
      }

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
