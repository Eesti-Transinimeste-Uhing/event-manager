import { JSONContent } from '@tiptap/core'
import { DateTime } from 'luxon'

import { hasMark } from './utils'

type DiscordTimeFormat =
  | 'relative'
  | 'short-time'
  | 'long-time'
  | 'short-date'
  | 'long-date'
  | 'long-date-short-time'
  | 'long-date-day-of-week-short-time'

const dtToDiscordSyntax = (dt: DateTime, format: DiscordTimeFormat): string => {
  const seconds = dt.toSeconds()

  switch (format) {
    case 'relative':
      return `<t:${seconds}:R>`
    case 'short-time':
      return `<t:${seconds}:t>`
    case 'long-time':
      return `<t:${seconds}:T>`
    case 'short-date':
      return `<t:${seconds}:d>`
    case 'long-date':
      return `<t:${seconds}:D>`
    case 'long-date-short-time':
      return `<t:${seconds}:f>`
    case 'long-date-day-of-week-short-time':
      return `<t:${seconds}:F>`
  }
}

export const discord = (json: JSONContent): string => {
  let result = ''

  if (json.type === 'doc' && json.content) {
    for (const node of json.content) {
      result += discord(node)
    }

    return result
  }

  if (json.type === 'paragraph') {
    result += '\n'

    if (json.content)
      for (const node of json.content) {
        result += discord(node)
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
