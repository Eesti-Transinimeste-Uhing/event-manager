import { JSONContent } from '@tiptap/core'
import { TiptapRenderer } from './base'
import { DateTime } from 'luxon'

class JsonRenderer extends TiptapRenderer {
  public renderJsonContent(json: JSONContent): string {
    return JSON.stringify(json)
  }

  public renderDateTime(dt: DateTime): string {
    return dt.toISO() || ''
  }
}

export const jsonRenderer = new JsonRenderer()
