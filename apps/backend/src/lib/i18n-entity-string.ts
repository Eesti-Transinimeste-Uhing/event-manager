import { Column } from 'typeorm'

import { SupportedLanguages } from './i18n'

export class I18NString implements Record<SupportedLanguages, unknown> {
  @Column('varchar', { nullable: true })
  en_GB: string

  @Column('varchar', { nullable: true })
  et_EE: string

  @Column('varchar', { nullable: true })
  ru_RU: string
}
