import { allow, and, deny, shield } from 'graphql-shield'
import { IRules, ShieldRule } from 'graphql-shield/typings/types'
import { NexusGenFieldTypes } from '../generated/typegen'

import { isPublisher } from './is-publisher'
import { isAuthenticated } from './is-authenticated'

export type GraphQLRules<RootType> = {
  [key in keyof RootType]:
    | (GraphQLRules<Partial<RootType[key]>> & {
        '*'?: ShieldRule
      })
    | ShieldRule
}

const rules: Partial<GraphQLRules<NexusGenFieldTypes>> = {
  Query: {
    form: allow,
    forms: and(isAuthenticated, isPublisher),
    template: and(isAuthenticated, isPublisher),
    templates: and(isAuthenticated, isPublisher),
    viewer: allow,
  },
  Mutation: {
    createForm: and(isAuthenticated, isPublisher),
    updateForm: and(isAuthenticated, isPublisher),
    removeForm: and(isAuthenticated, isPublisher),
    createTemplate: and(isAuthenticated, isPublisher),
    updateTemplate: and(isAuthenticated, isPublisher),
    removeTemplate: and(isAuthenticated, isPublisher),
    submitForm: allow,
  },

  DiscordUser: allow,
  Form: allow,
  FormConnection: allow,
  FormEdge: allow,
  PageInfo: allow,
  Template: allow,
  TemplateConnection: allow,
  TemplateEdge: allow,
  User: allow,
}

export const permissions = shield(rules as IRules, {
  fallbackRule: deny,
})
