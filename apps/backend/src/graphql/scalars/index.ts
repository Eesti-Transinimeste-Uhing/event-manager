import * as Scalar from 'graphql-scalars'
import { asNexusMethod } from 'nexus'
import { GraphQLUpload } from 'graphql-upload-minimal'

import { DateTimeResolver } from './date-time'

import { I18nJSONResolver, I18nStringResolver } from './i18n'

export const Url = asNexusMethod(Scalar.GraphQLURL, 'url')
export const DateTimeScalar = asNexusMethod(DateTimeResolver, 'dateTime')
export const UploadScalar = asNexusMethod(GraphQLUpload, 'upload')
export const JsonObjectScalar = asNexusMethod(Scalar.JSONObjectResolver, 'jsonObject')
export const I18nJSON = asNexusMethod(I18nJSONResolver, 'i18nJSON')
export const I18nString = asNexusMethod(I18nStringResolver, 'i18nString')
