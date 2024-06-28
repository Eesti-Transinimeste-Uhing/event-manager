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

    const item = jsons[i]

    if (item.type === 'doc') {
      if (item.content) content.push(...item.content)
    } else {
      content.push(item)
    }
  }

  return {
    type: 'doc',
    content,
  }
}
