import { Column } from 'typeorm'

import { SupportedLanguages } from './i18n'

export class I18NString implements Record<SupportedLanguages, unknown> {
  @Column('varchar', { nullable: true, default: '' })
  en_GB: string

  @Column('varchar', { nullable: true, default: '' })
  et_EE: string

  @Column('varchar', { nullable: true, default: '' })
  ru_RU: string
}
