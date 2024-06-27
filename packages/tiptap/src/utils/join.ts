import { JSONContent } from '@tiptap/core'

export const join = (
  jsons: JSONContent[],
  joiner?: (index: number) => JSONContent[]
): JSONContent => {
  const content: JSONContent[] = [] // = jsons.flatMap((json) => json.content ?? [])

  for (let i = 0; i < jsons.length; i++) {
    if (joiner && i <= jsons.length - 1) {
      content.push(...joiner(i))
    }

    content.push(jsons[i])
  }

  return {
    type: 'doc',
    content,
  }
}
