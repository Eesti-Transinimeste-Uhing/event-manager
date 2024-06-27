import { JSONContent } from '@tiptap/core'

import { markdownRenderer } from './markdown'
import { htmlRenderer } from './html'
import { discordRenderer } from './discord'
import { plainTextRenderer } from './plain-text'
import { jsonRenderer } from './json'

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
      return markdownRenderer.renderJsonContent(content)
    case RenderTarget.Html:
      return htmlRenderer.renderJsonContent(content)
    case RenderTarget.Discord:
      return discordRenderer.renderJsonContent(content)
    case RenderTarget.PlainText:
      return plainTextRenderer.renderJsonContent(content)
    case RenderTarget.Json:
      return jsonRenderer.renderJsonContent(content)
  }

  return ''
}
