import { JSONContent } from '@tiptap/core'
import { DateTimeArg, TiptapRenderer } from './base'
import { DateTime } from 'luxon'

class JsonRenderer extends TiptapRenderer {
  public renderJsonContent(json: JSONContent): string {
    return JSON.stringify(json)
  }

  public override renderDateTime(dt: DateTime, arg: DateTimeArg): string {
    switch (arg.preset) {
      case 'relative':
        return dt.setLocale(arg.luxonLang).toRelative() || ''
      case 'datetime':
        return dt.setLocale(arg.luxonLang).toLocaleString(DateTime.DATETIME_MED) || ''
    }
  }
}

export const jsonRenderer = new JsonRenderer()
