import { Column } from 'typeorm'

import { SupportedLanguages } from '@etu/events-proto/dist/lib'

export class I18NString implements Record<keyof typeof SupportedLanguages, unknown> {
  @Column('varchar', { nullable: true, default: '' })
  en_GB: string

  @Column('varchar', { nullable: true, default: '' })
  et_EE: string

  @Column('varchar', { nullable: true, default: '' })
  ru_RU: string
}
