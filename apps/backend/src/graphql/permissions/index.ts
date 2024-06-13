import { allow, and, deny, or, shield } from 'graphql-shield'
import { ShieldRule } from 'graphql-shield/typings/types'
import { NexusGenFieldTypes } from '../generated/typegen'

import { wrapError } from '../../lib/error-wrapping'
import { UnauthorisedError } from '../../lib/errors'

import { isAuthenticated } from './is-authenticated'
import { isOwnDiscordProfile } from './is-own-discord-profile'
import { isAdmin } from './is-admin'
import { isPublisher } from './is-publisher'
import { isEditor } from './is-editor'
import { isOwner } from './is-owner'

export type GraphQLRules<RootType> = {
  [key in keyof RootType]:
    | (GraphQLRules<Partial<RootType[key]>> & {
        '*'?: ShieldRule
      })
    | ShieldRule
}

export const permissions = shield<GraphQLRules<NexusGenFieldTypes>>(
  {
    Query: {
      form: allow,
      forms: and(isAuthenticated, or(isOwner, isAdmin, isEditor, isPublisher)),
      template: and(isAuthenticated, or(isOwner, isAdmin, isEditor)),
      templates: and(isAuthenticated, or(isOwner, isAdmin, isEditor, isPublisher)),
      viewer: allow,
      formSubmissions: and(isAuthenticated, or(isOwner, isAdmin)),
    },
    Mutation: {
      createForm: and(isAuthenticated, or(isOwner, isAdmin, isEditor, isPublisher)),
      updateForm: and(isAuthenticated, or(isOwner, isAdmin, isEditor, isPublisher)),
      removeForm: and(isAuthenticated, or(isOwner, isAdmin, isEditor)),
      createTemplate: and(isAuthenticated, or(isOwner, isAdmin, isEditor)),
      updateTemplate: and(isAuthenticated, or(isOwner, isAdmin, isEditor)),
      removeTemplate: and(isAuthenticated, or(isOwner, isAdmin, isEditor)),
      submitForm: allow,

      announceForm: and(isAuthenticated, or(isOwner, isAdmin, isPublisher)),
    },

    DiscordUser: and(isAuthenticated, isOwnDiscordProfile),
    Form: allow,
    FormConnection: allow,
    FormEdge: allow,
    PageInfo: allow,
    Template: allow,
    TemplateConnection: allow,
    TemplateEdge: allow,
    User: allow,
    FormSubmissionConnection: allow,
    FormSubmissionEdge: allow,
    FormSubmission: allow,
    FormSubmissionData: allow,
  },
  {
    fallbackError(thrownThing) {
      return wrapError(thrownThing) ?? new UnauthorisedError()
    },
    fallbackRule: deny,
  }
)
