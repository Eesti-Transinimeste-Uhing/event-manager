import { enumType } from 'nexus'
import { FormFieldKind as FormFieldKindEnum } from '@etu/events-proto'

export const FormFieldKind = enumType({
  name: 'FormFieldKind',
  members: FormFieldKindEnum,
})
