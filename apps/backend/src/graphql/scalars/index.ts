import * as Scalar from 'graphql-scalars'
import { asNexusMethod } from 'nexus'
import { GraphQLUpload } from 'graphql-upload-minimal'

import { DateTimeResolver } from './date-time'

export const Url = asNexusMethod(Scalar.GraphQLURL, 'url')
export const DateTimeScalar = asNexusMethod(DateTimeResolver, 'dateTime')
export const UploadScalar = asNexusMethod(GraphQLUpload, 'upload')
export const JsonObjectScalar = asNexusMethod(Scalar.JSONObjectResolver, 'jsonObject')
