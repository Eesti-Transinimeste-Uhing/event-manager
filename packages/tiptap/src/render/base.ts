import { JSONContent } from '@tiptap/core'
import { DateTime } from 'luxon'

export type DateTimeArg = {
  preset: 'datetime' | 'relative'
  luxonLang: string
}

export abstract class TiptapRenderer {
  public abstract renderDateTime(dt: DateTime, arg: DateTimeArg): string

  public abstract renderJsonContent(json: JSONContent): string
}
