import { enumType } from 'nexus'
import { FormFieldKind as FormFieldKindEnum } from '@etu/events-proto/generated/backend/forms'

export const FormFieldKind = enumType({
  name: 'FormFieldKind',
  members: FormFieldKindEnum,
})
