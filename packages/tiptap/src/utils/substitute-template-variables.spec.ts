import test from 'ava'
import { JSONContent } from '@tiptap/core'
import cloneDeep from 'lodash.clonedeep'

import { substituteTemplateVariables } from './substitute-template-variables'

test('substitutes first-level template vars', (t) => {
  const input: JSONContent = {
    type: 'doc',
    content: [
      {
        type: 'template-variable',
        attrs: {
          id: 'event-location',
        },
      },
    ],
  }

  const result = cloneDeep(input)

  substituteTemplateVariables(result, {
    startsAt: new Date('2022-07-01T10:00:00Z'),
    luxonLang: 'en',
    location: 'Somewhere',
  })

  t.deepEqual(result, {
    type: 'doc',
    content: [
      {
        type: 'text',
        text: 'Somewhere',
      },
    ],
  })
})

test('substitutes nested template vars', (t) => {
  const input: JSONContent = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'template-variable',
            attrs: {
              id: 'event-location',
            },
          },
        ],
      },
    ],
  }

  const result = cloneDeep(input)

  substituteTemplateVariables(result, {
    startsAt: new Date('2022-07-01T10:00:00Z'),
    luxonLang: 'en',
    location: 'Somewhere',
  })

  t.deepEqual(result, {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Somewhere',
          },
        ],
      },
    ],
  })
})
