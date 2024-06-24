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
      forms: and(isAuthenticated, or(isAdmin, isEditor)),
      template: and(isAuthenticated, or(isAdmin, isEditor)),
      templates: and(isAuthenticated, or(isAdmin, isEditor)),
      viewer: allow,
      formSubmissions: and(isAuthenticated, isAdmin),
      announcers: and(isAuthenticated, or(isAdmin, isPublisher)),
    },
    Mutation: {
      createForm: and(isAuthenticated, or(isAdmin, isEditor)),
      updateForm: and(isAuthenticated, or(isAdmin, isEditor)),
      removeForm: and(isAuthenticated, or(isAdmin, isEditor)),
      createTemplate: and(isAuthenticated, or(isAdmin, isEditor)),
      updateTemplate: and(isAuthenticated, or(isAdmin, isEditor)),
      removeTemplate: and(isAuthenticated, or(isAdmin, isEditor)),

      submitForm: allow, // anyone can submit a form even if they are not authenticated

      announceForm: and(isAuthenticated, or(isAdmin, isPublisher)),

      createAnnouncer: and(isAuthenticated, or(isAdmin, isPublisher)),
      updateAnnouncer: and(isAuthenticated, or(isAdmin, isPublisher)),
    },

    DiscordUser: and(isAuthenticated, isOwnDiscordProfile),
    Form: allow,
    FormConnection: allow,
    FormEdge: allow,
    PageInfo: allow,
    Template: allow,
    TemplateConnection: allow,
    TemplateEdge: allow,
    Announcer: allow,
    AnnouncerConnection: allow,
    AnnouncerEdge: allow,
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
