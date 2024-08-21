import { allow, and, deny, or, shield } from 'graphql-shield'
import { ShieldRule } from 'graphql-shield/typings/types'
import { NexusGenFieldTypes } from '../generated/typegen'

import { wrapError } from '../../lib/error-wrapping'
import { UnauthorisedError } from '../../lib/errors'

import { isOwnDiscordProfile } from './is-own-discord-profile'
import { isAdmin } from './is-admin'
import { isPublisher } from './is-publisher'
import { isEditor } from './is-editor'
import { isAuthenticated } from './is-authenticated'
import { hasFlag } from './has-flag'

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
      viewer: allow,

      form: allow,
      forms: or(isAdmin, isEditor),

      template: or(isAdmin, isEditor),
      templates: or(isAdmin, isEditor),

      formSubmissions: isAdmin,

      announcer: and(hasFlag('announcements'), or(isAdmin, isPublisher)),
      announcers: and(hasFlag('announcements'), or(isAdmin, isPublisher)),
    },
    Mutation: {
      createForm: or(isAdmin, isEditor),
      updateForm: or(isAdmin, isEditor),
      removeForm: or(isAdmin, isEditor),
      createTemplate: or(isAdmin, isEditor),
      removeTemplate: or(isAdmin, isEditor),
      updateTemplate: or(isAdmin, isEditor),

      submitForm: allow, // anyone can submit a form even if they are not authenticated

      announceForm: and(hasFlag('announcements'), or(isAdmin, isPublisher)),

      createAnnouncer: and(hasFlag('announcements'), or(isAdmin, isPublisher)),
      updateAnnouncer: and(hasFlag('announcements'), or(isAdmin, isPublisher)),
    },
    Subscription: {
      test: allow,
    },

    DiscordUser: isOwnDiscordProfile,
    Form: allow,
    FormConnection: isAuthenticated,
    FormEdge: isAuthenticated,
    PageInfo: isAuthenticated,
    Template: isAuthenticated,
    TemplateConnection: isAuthenticated,
    TemplateEdge: isAuthenticated,
    Announcer: isAuthenticated,
    AnnouncerConnection: isAuthenticated,
    AnnouncerEdge: isAuthenticated,
    AnnouncerOptions: isAuthenticated,
    AnnouncerOptionsDiscord: isAuthenticated,
    AnnouncerReadiness: isAuthenticated,
    User: isAuthenticated,
    FormSubmissionConnection: isAuthenticated,
    FormSubmissionEdge: isAuthenticated,
    FormSubmission: isAuthenticated,
    FormSubmissionData: isAuthenticated,
    FormSubmittability: isAuthenticated,
    BullJob: isAuthenticated,
  },
  {
    fallbackError(thrownThing) {
      return wrapError(thrownThing) ?? new UnauthorisedError()
    },
    fallbackRule: deny,
  }
)
