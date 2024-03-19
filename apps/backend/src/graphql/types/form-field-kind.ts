import { enumType } from 'nexus'
import { FormFieldKind as FormFieldKindEnum } from '../../entity/template'

export const FormFieldKind = enumType({
  name: 'FormFieldKind',
  members: FormFieldKindEnum,
})
