import * as Scalar from 'graphql-scalars'
import { asNexusMethod } from 'nexus'

export const Url = asNexusMethod(Scalar.GraphQLURL, 'url')
