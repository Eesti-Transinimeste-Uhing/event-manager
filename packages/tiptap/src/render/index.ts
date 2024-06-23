import { JSONContent } from '@tiptap/core'

import { markdown } from './markdown'
import { html } from './html'
import { discord } from './discord'
import { plainText } from './plain-text'
import { json } from './json'

export const RenderTarget = {
  Markdown: 1,
  Discord: 2,
  Html: 3,
  PlainText: 4,
  Json: 5,
} as const

export type RenderTarget = (typeof RenderTarget)[keyof typeof RenderTarget]

export type RenderData = {
  startsAt: Date
  location: string
  luxonLang: string
}

export const renderJsonContent = (content: JSONContent, target: RenderTarget): string => {
  switch (target) {
    case RenderTarget.Markdown:
      return markdown(content)
    case RenderTarget.Html:
      return html(content)
    case RenderTarget.Discord:
      return discord(content)
    case RenderTarget.PlainText:
      return plainText(content)
    case RenderTarget.Json:
      return json(content)
  }

  return ''
}
