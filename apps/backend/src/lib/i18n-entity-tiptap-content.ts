import { JSONContent } from '@tiptap/core'
import { Column } from 'typeorm'
import { SupportedLanguages } from '@etu/events-proto/dist/lib'

export class I18NTiptapContent implements Record<keyof typeof SupportedLanguages, unknown> {
  @Column('jsonb', { nullable: true })
  en_GB: JSONContent

  @Column('jsonb', { nullable: true })
  et_EE: JSONContent

  @Column('jsonb', { nullable: true })
  ru_RU: JSONContent
}
