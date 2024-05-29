import { JSONContent } from '@tiptap/core'

export const hasMark = (json: JSONContent, mark: string) => {
  if (!json.marks || json.marks.length === 0) return false

  return json.marks.some((jsonMark) => jsonMark.type === mark)
}
