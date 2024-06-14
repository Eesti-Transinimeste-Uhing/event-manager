import { JSONContent } from '@tiptap/core'

import { markdown } from './markdown'
import { html } from './html'
import { discord } from './discord'
import { plainText } from './plain-text'

export const RenderTarget = {
  Markdown: 1,
  Discord: 2,
  Html: 3,
  PlainText: 4,
} as const

export type RenderTarget = (typeof RenderTarget)[keyof typeof RenderTarget]

export type RenderData = {
  startsAt: Date
  location: string
  luxonLang: string
}

export const renderJsonContent = (
  json: JSONContent,
  target: RenderTarget,
  data: RenderData
): string => {
  switch (target) {
    case RenderTarget.Markdown:
      return markdown(json, data)
    case RenderTarget.Html:
      return html(json, data)
    case RenderTarget.Discord:
      return discord(json, data)
    case RenderTarget.PlainText:
      return plainText(json, data)
  }

  return ''
}
