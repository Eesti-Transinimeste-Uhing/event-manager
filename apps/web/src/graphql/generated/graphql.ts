/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A DateTime value consumable with Luxon */
  DateTime: { input: any; output: any }
  /** An object that contains strings for all supported languages */
  I18nJSON: { input: any; output: any }
  /** An object that contains strings for all supported languages */
  I18nString: {
    input: Record<SupportedLanguages, string>
    output: Record<SupportedLanguages, string>
  }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any }
}

export type AnnounceFormWhereInput = {
  id: Scalars['ID']['input']
}

export type Announcer = {
  __typename?: 'Announcer'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  options?: Maybe<AnnouncerOptions>
  readiness: AnnouncerReadiness
  type: AnnouncerType
  updatedAt: Scalars['DateTime']['output']
}

export type AnnouncerConnection = {
  __typename?: 'AnnouncerConnection'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<AnnouncerEdge>
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo
}

export type AnnouncerEdge = {
  __typename?: 'AnnouncerEdge'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output']
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Announcer
}

export type AnnouncerOptions = AnnouncerOptionsDiscord

export type AnnouncerOptionsDiscord = {
  __typename?: 'AnnouncerOptionsDiscord'
  channelId: Scalars['String']['output']
  guildId: Scalars['String']['output']
}

export type AnnouncerOptionsDiscordInput = {
  channelId: Scalars['String']['input']
  guildId: Scalars['String']['input']
}

export type AnnouncerOptionsInput = {
  discord: AnnouncerOptionsDiscordInput
}

export type AnnouncerReadiness = {
  __typename?: 'AnnouncerReadiness'
  status: AnnouncerStatus
}

export enum AnnouncerStatus {
  Offline = 'Offline',
  Online = 'Online',
}

export enum AnnouncerType {
  Discord = 'Discord',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Unset = 'Unset',
}

export type BullJob = {
  __typename?: 'BullJob'
  attemptsMade: Scalars['Int']['output']
  delay: Scalars['Int']['output']
  finishedOn?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  processedOn?: Maybe<Scalars['DateTime']['output']>
  progress: Scalars['String']['output']
  timestamp: Scalars['DateTime']['output']
}

export type CreateAnnouncerData = {
  type: AnnouncerType
}

export type CreateFormInput = {
  templateId: Scalars['ID']['input']
}

export type DiscordUser = {
  __typename?: 'DiscordUser'
  avatar: Scalars['URL']['output']
  banner_color: Scalars['String']['output']
  global_name: Scalars['String']['output']
  id: Scalars['ID']['output']
  locale: Scalars['String']['output']
  username: Scalars['String']['output']
}

export type Form = {
  __typename?: 'Form'
  banner: Scalars['URL']['output']
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  description_i18n: Scalars['I18nJSON']['output']
  id: Scalars['ID']['output']
  location?: Maybe<Scalars['String']['output']>
  location_i18n: Scalars['I18nString']['output']
  name?: Maybe<Scalars['String']['output']>
  name_i18n: Scalars['I18nString']['output']
  startsAt?: Maybe<Scalars['DateTime']['output']>
  submitLimit: Scalars['Int']['output']
  submittability: FormSubmittability
  template: Template
  updatedAt: Scalars['DateTime']['output']
}

export type FormDescriptionArgs = {
  target: RenderTarget
  where: WhereLangInput
}

export type FormLocationArgs = {
  where: WhereLangInput
}

export type FormNameArgs = {
  where: WhereLangInput
}

export type FormConnection = {
  __typename?: 'FormConnection'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<FormEdge>
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo
}

export type FormEdge = {
  __typename?: 'FormEdge'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output']
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Form
}

export enum FormFieldKind {
  Age = 'Age',
  ConfirmEvent = 'ConfirmEvent',
  Email = 'Email',
  Gender = 'Gender',
  PreferredName = 'PreferredName',
}

export type FormSubmission = {
  __typename?: 'FormSubmission'
  createdAt: Scalars['DateTime']['output']
  data: Array<FormSubmissionData>
  form: Form
  id: Scalars['ID']['output']
}

export type FormSubmissionConnection = {
  __typename?: 'FormSubmissionConnection'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<FormSubmissionEdge>
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo
}

export type FormSubmissionData = {
  __typename?: 'FormSubmissionData'
  name: Scalars['String']['output']
  value?: Maybe<Scalars['String']['output']>
}

export type FormSubmissionEdge = {
  __typename?: 'FormSubmissionEdge'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output']
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: FormSubmission
}

export type FormSubmittability = {
  __typename?: 'FormSubmittability'
  submittable: Scalars['Boolean']['output']
  tags: Array<FormSubmittabilityTag>
}

export enum FormSubmittabilityTag {
  AlreadySubmitted = 'AlreadySubmitted',
  FormDoesNotExist = 'FormDoesNotExist',
  SubmitLimitReached = 'SubmitLimitReached',
}

export type I18nJsonInput = {
  en_GB?: InputMaybe<Scalars['JSONObject']['input']>
  et_EE?: InputMaybe<Scalars['JSONObject']['input']>
  ru_RU?: InputMaybe<Scalars['JSONObject']['input']>
}

export type I18nStringInput = {
  en_GB: Scalars['String']['input']
  et_EE: Scalars['String']['input']
  ru_RU: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  announceForm: BullJob
  createAnnouncer: Announcer
  createForm: Form
  createTemplate: Template
  removeForm: Scalars['Boolean']['output']
  removeTemplate: Scalars['Boolean']['output']
  submitForm: Scalars['Boolean']['output']
  updateAnnouncer?: Maybe<Announcer>
  updateForm?: Maybe<Form>
  updateTemplate?: Maybe<Template>
}

export type MutationAnnounceFormArgs = {
  where: AnnounceFormWhereInput
}

export type MutationCreateAnnouncerArgs = {
  data: CreateAnnouncerData
}

export type MutationCreateFormArgs = {
  input: CreateFormInput
}

export type MutationRemoveFormArgs = {
  input: RemoveFormInput
}

export type MutationRemoveTemplateArgs = {
  input: RemoveTemplateInput
}

export type MutationSubmitFormArgs = {
  data: Array<SubmitFormDataInput>
  where: SubmitFormWhereInput
}

export type MutationUpdateAnnouncerArgs = {
  data: UpdateAnnouncerDataInput
  where: UpdateAnnouncerWhereInput
}

export type MutationUpdateFormArgs = {
  data: UpdateFormDataInput
  where: UpdateFormWhereInput
}

export type MutationUpdateTemplateArgs = {
  data: UpdateTemplateDataInput
  where: UpdateTemplateWhereInput
}

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']['output']>
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']['output']>
  /** The total amount of items in the repository after filters are applied */
  totalCount?: Maybe<Scalars['Int']['output']>
}

export type PaginationFilter = {
  columns: Array<Scalars['String']['input']>
  query: Scalars['String']['input']
}

export type PaginationSorting = {
  columns: Array<Scalars['String']['input']>
  order: PaginationSortingOrder
}

export enum PaginationSortingOrder {
  Asc = 'Asc',
  Desc = 'Desc',
}

export type Query = {
  __typename?: 'Query'
  announcer?: Maybe<Announcer>
  announcers: AnnouncerConnection
  form?: Maybe<Form>
  formSubmissions: FormSubmissionConnection
  forms: FormConnection
  template?: Maybe<Template>
  templates: TemplateConnection
  viewer?: Maybe<User>
}

export type QueryAnnouncerArgs = {
  where: WhereIdInput
}

export type QueryAnnouncersArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort: PaginationSorting
}

export type QueryFormArgs = {
  where: WhereIdInput
}

export type QueryFormSubmissionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort: PaginationSorting
}

export type QueryFormsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort: PaginationSorting
}

export type QueryTemplateArgs = {
  where: WhereIdInput
}

export type QueryTemplatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort: PaginationSorting
}

export type RemoveFormInput = {
  id: Scalars['ID']['input']
}

export type RemoveTemplateInput = {
  id: Scalars['ID']['input']
}

export enum RenderTarget {
  Discord = 'Discord',
  Html = 'Html',
  Json = 'Json',
  Markdown = 'Markdown',
  PlainText = 'PlainText',
}

export type SubmitFormDataInput = {
  name: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type SubmitFormWhereInput = {
  id: Scalars['ID']['input']
}

export type Subscription = {
  __typename?: 'Subscription'
  test: Scalars['String']['output']
}

export enum SupportedLanguages {
  EnGb = 'en_GB',
  EtEe = 'et_EE',
  RuRu = 'ru_RU',
}

export type Template = {
  __typename?: 'Template'
  banner: Scalars['URL']['output']
  bannerOffset: Scalars['Int']['output']
  createdAt: Scalars['DateTime']['output']
  defaultSubmitLimit: Scalars['Int']['output']
  description?: Maybe<Scalars['JSONObject']['output']>
  description_i18n: Scalars['I18nJSON']['output']
  fields: Array<FormFieldKind>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  name_i18n: Scalars['I18nString']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type TemplateDescriptionArgs = {
  where: WhereLangInput
}

export type TemplateNameArgs = {
  where: WhereLangInput
}

export type TemplateConnection = {
  __typename?: 'TemplateConnection'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Array<TemplateEdge>
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo
}

export type TemplateEdge = {
  __typename?: 'TemplateEdge'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output']
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Template
}

export type UpdateAnnouncerDataInput = {
  name: Scalars['String']['input']
  options: AnnouncerOptionsInput
}

export type UpdateAnnouncerWhereInput = {
  id: Scalars['ID']['input']
}

export type UpdateFormDataInput = {
  location: I18nStringInput
  name: I18nStringInput
  startsAt: Scalars['DateTime']['input']
  submitLimit: Scalars['Int']['input']
}

export type UpdateFormWhereInput = {
  id: Scalars['ID']['input']
}

export type UpdateTemplateDataInput = {
  banner?: InputMaybe<Scalars['Upload']['input']>
  bannerOffset: Scalars['Int']['input']
  defaultSubmitLimit: Scalars['Int']['input']
  description: I18nJsonInput
  fields: Array<FormFieldKind>
  name: I18nStringInput
}

export type UpdateTemplateWhereInput = {
  id: Scalars['ID']['input']
}

export type User = {
  __typename?: 'User'
  discord: DiscordUser
  id: Scalars['ID']['output']
  roles: Array<UserRole>
}

export enum UserRole {
  Admin = 'Admin',
  Editor = 'Editor',
  Owner = 'Owner',
  Publisher = 'Publisher',
}

export type WhereIdInput = {
  id: Scalars['ID']['input']
}

export type WhereLangInput = {
  language: SupportedLanguages
}

export type AccountMenuViewerQueryVariables = Exact<{ [key: string]: never }>

export type AccountMenuViewerQuery = {
  __typename?: 'Query'
  viewer?: {
    __typename?: 'User'
    id: string
    discord: { __typename?: 'DiscordUser'; id: string; avatar: any; name: string }
  } | null
}

export type PublicLayoutViewerQueryVariables = Exact<{ [key: string]: never }>

export type PublicLayoutViewerQuery = {
  __typename?: 'Query'
  viewer?: { __typename?: 'User'; id: string; roles: Array<UserRole> } | null
}

export type AnnouncerListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  sort: PaginationSorting
}>

export type AnnouncerListQuery = {
  __typename?: 'Query'
  announcers: {
    __typename?: 'AnnouncerConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      totalCount?: number | null
      hasNextPage?: boolean | null
      hasPreviousPage?: boolean | null
      endCursor?: string | null
      startCursor?: string | null
    }
    edges: Array<{
      __typename?: 'AnnouncerEdge'
      node: {
        __typename?: 'Announcer'
        id: string
        createdAt: any
        updatedAt: any
        name: string
        type: AnnouncerType
        readiness: { __typename?: 'AnnouncerReadiness'; status: AnnouncerStatus }
      }
    }>
  }
}

export type CreateAnnouncerMutationVariables = Exact<{
  data: CreateAnnouncerData
}>

export type CreateAnnouncerMutation = {
  __typename?: 'Mutation'
  createAnnouncer: { __typename?: 'Announcer'; id: string }
}

export type UpdateAnnouncerMutationVariables = Exact<{
  where: UpdateAnnouncerWhereInput
  data: UpdateAnnouncerDataInput
}>

export type UpdateAnnouncerMutation = {
  __typename?: 'Mutation'
  updateAnnouncer?: { __typename?: 'Announcer'; id: string } | null
}

export type AnnouncerQueryVariables = Exact<{
  where: WhereIdInput
}>

export type AnnouncerQuery = {
  __typename?: 'Query'
  announcer?: {
    __typename?: 'Announcer'
    id: string
    name: string
    type: AnnouncerType
    options?: { __typename?: 'AnnouncerOptionsDiscord'; guildId: string; channelId: string } | null
  } | null
}

export type PostOauthViewerQueryVariables = Exact<{ [key: string]: never }>

export type PostOauthViewerQuery = {
  __typename?: 'Query'
  viewer?: { __typename?: 'User'; id: string } | null
}

export type UpdateFormMutationVariables = Exact<{
  where: UpdateFormWhereInput
  data: UpdateFormDataInput
}>

export type UpdateFormMutation = {
  __typename?: 'Mutation'
  updateForm?: { __typename?: 'Form'; id: string } | null
}

export type EditFormQueryVariables = Exact<{
  where: WhereIdInput
}>

export type EditFormQuery = {
  __typename?: 'Query'
  form?: {
    __typename?: 'Form'
    id: string
    startsAt?: any | null
    submitLimit: number
    name: Record<SupportedLanguages, string>
    location: Record<SupportedLanguages, string>
    template: { __typename?: 'Template'; id: string }
  } | null
}

export type FormListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  sort: PaginationSorting
  lang: SupportedLanguages
}>

export type FormListQuery = {
  __typename?: 'Query'
  forms: {
    __typename?: 'FormConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      totalCount?: number | null
      hasNextPage?: boolean | null
      hasPreviousPage?: boolean | null
      endCursor?: string | null
      startCursor?: string | null
    }
    edges: Array<{
      __typename?: 'FormEdge'
      node: {
        __typename?: 'Form'
        id: string
        createdAt: any
        updatedAt: any
        name?: string | null
        banner: any
        template: {
          __typename?: 'Template'
          id: string
          name: string
          banner: any
          bannerOffset: number
        }
      }
    }>
  }
}

export type CreateFormMutationVariables = Exact<{
  input: CreateFormInput
}>

export type CreateFormMutation = {
  __typename?: 'Mutation'
  createForm: { __typename?: 'Form'; id: string }
}

export type SearchTemplatesQueryVariables = Exact<{
  filter: PaginationFilter
  first?: InputMaybe<Scalars['Int']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort: PaginationSorting
  lang: SupportedLanguages
}>

export type SearchTemplatesQuery = {
  __typename?: 'Query'
  templates: {
    __typename?: 'TemplateConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      endCursor?: string | null
      startCursor?: string | null
      hasNextPage?: boolean | null
      hasPreviousPage?: boolean | null
      totalCount?: number | null
    }
    edges: Array<{
      __typename?: 'TemplateEdge'
      node: { __typename?: 'Template'; id: string; name: string }
    }>
  }
}

export type FormSubmitQueryVariables = Exact<{
  where: WhereIdInput
  lang: SupportedLanguages
  target: RenderTarget
}>

export type FormSubmitQuery = {
  __typename?: 'Query'
  form?: {
    __typename?: 'Form'
    id: string
    name?: string | null
    banner: any
    description: string
    submittability: {
      __typename?: 'FormSubmittability'
      submittable: boolean
      tags: Array<FormSubmittabilityTag>
    }
    template: { __typename?: 'Template'; id: string; fields: Array<FormFieldKind> }
  } | null
}

export type SubmitFormMutationVariables = Exact<{
  where: SubmitFormWhereInput
  data: Array<SubmitFormDataInput> | SubmitFormDataInput
}>

export type SubmitFormMutation = { __typename?: 'Mutation'; submitForm: boolean }

export type FormSubmissionListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  sort: PaginationSorting
  lang: SupportedLanguages
}>

export type FormSubmissionListQuery = {
  __typename?: 'Query'
  formSubmissions: {
    __typename?: 'FormSubmissionConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      totalCount?: number | null
      hasNextPage?: boolean | null
      hasPreviousPage?: boolean | null
      endCursor?: string | null
      startCursor?: string | null
    }
    edges: Array<{
      __typename?: 'FormSubmissionEdge'
      node: {
        __typename?: 'FormSubmission'
        id: string
        createdAt: any
        form: {
          __typename?: 'Form'
          id: string
          name?: string | null
          template: { __typename?: 'Template'; id: string; name: string }
        }
        data: Array<{ __typename?: 'FormSubmissionData'; name: string; value?: string | null }>
      }
    }>
  }
}

export type EditTemplateQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type EditTemplateQuery = {
  __typename?: 'Query'
  template?: {
    __typename?: 'Template'
    id: string
    updatedAt: any
    banner: any
    fields: Array<FormFieldKind>
    bannerOffset: number
    defaultSubmitLimit: number
    name: Record<SupportedLanguages, string>
    description: any
  } | null
}

export type UpdateTemplateMutationVariables = Exact<{
  where: UpdateTemplateWhereInput
  data: UpdateTemplateDataInput
}>

export type UpdateTemplateMutation = {
  __typename?: 'Mutation'
  updateTemplate?: { __typename?: 'Template'; id: string } | null
}

export type TemplateListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter: PaginationFilter
  sort: PaginationSorting
  lang: SupportedLanguages
}>

export type TemplateListQuery = {
  __typename?: 'Query'
  templates: {
    __typename?: 'TemplateConnection'
    pageInfo: {
      __typename?: 'PageInfo'
      totalCount?: number | null
      hasNextPage?: boolean | null
      hasPreviousPage?: boolean | null
      endCursor?: string | null
      startCursor?: string | null
    }
    edges: Array<{
      __typename?: 'TemplateEdge'
      node: { __typename?: 'Template'; id: string; name: string; updatedAt: any; banner: any }
    }>
  }
}

export type CreateTemplateMutationVariables = Exact<{ [key: string]: never }>

export type CreateTemplateMutation = {
  __typename?: 'Mutation'
  createTemplate: { __typename?: 'Template'; id: string }
}

export type AuthRouteGuardQueryVariables = Exact<{ [key: string]: never }>

export type AuthRouteGuardQuery = {
  __typename?: 'Query'
  viewer?: { __typename?: 'User'; id: string } | null
}

export const AccountMenuViewerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AccountMenuViewer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'viewer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'discord' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'name' },
                        name: { kind: 'Name', value: 'global_name' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AccountMenuViewerQuery, AccountMenuViewerQueryVariables>
export const PublicLayoutViewerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PublicLayoutViewer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'viewer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicLayoutViewerQuery, PublicLayoutViewerQueryVariables>
export const AnnouncerListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AnnouncerList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationFilter' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationSorting' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'announcers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'readiness' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnnouncerListQuery, AnnouncerListQueryVariables>
export const CreateAnnouncerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateAnnouncer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateAnnouncerData' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createAnnouncer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAnnouncerMutation, CreateAnnouncerMutationVariables>
export const UpdateAnnouncerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateAnnouncer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateAnnouncerWhereInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateAnnouncerDataInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateAnnouncer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAnnouncerMutation, UpdateAnnouncerMutationVariables>
export const AnnouncerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Announcer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'WhereIdInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'announcer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'options' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'InlineFragment',
                        typeCondition: {
                          kind: 'NamedType',
                          name: { kind: 'Name', value: 'AnnouncerOptionsDiscord' },
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'channelId' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnnouncerQuery, AnnouncerQueryVariables>
export const PostOauthViewerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'PostOauthViewer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'viewer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostOauthViewerQuery, PostOauthViewerQueryVariables>
export const UpdateFormDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateForm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateFormWhereInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateFormDataInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateForm' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateFormMutation, UpdateFormMutationVariables>
export const EditFormDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EditForm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'WhereIdInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'form' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'name' },
                  name: { kind: 'Name', value: 'name_i18n' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'location' },
                  name: { kind: 'Name', value: 'location_i18n' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'submitLimit' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'template' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditFormQuery, EditFormQueryVariables>
export const FormListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FormList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationFilter' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationSorting' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lang' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SupportedLanguages' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'forms' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'language' },
                                        value: {
                                          kind: 'Variable',
                                          name: { kind: 'Name', value: 'lang' },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'template' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'where' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'language' },
                                              value: {
                                                kind: 'Variable',
                                                name: { kind: 'Name', value: 'lang' },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'bannerOffset' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FormListQuery, FormListQueryVariables>
export const CreateFormDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateForm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateFormInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createForm' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateFormMutation, CreateFormMutationVariables>
export const SearchTemplatesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SearchTemplates' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationFilter' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationSorting' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lang' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SupportedLanguages' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'templates' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'language' },
                                        value: {
                                          kind: 'Variable',
                                          name: { kind: 'Name', value: 'lang' },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchTemplatesQuery, SearchTemplatesQueryVariables>
export const FormSubmitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FormSubmit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'WhereIdInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lang' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SupportedLanguages' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'target' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'RenderTarget' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'form' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'name' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'language' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'lang' } },
                          },
                        ],
                      },
                    },
                  ],
                },
                { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'description' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'language' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'lang' } },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'target' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'target' } },
                    },
                  ],
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'submittability' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'submittable' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'template' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fields' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FormSubmitQuery, FormSubmitQueryVariables>
export const SubmitFormDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SubmitForm' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SubmitFormWhereInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: { kind: 'NamedType', name: { kind: 'Name', value: 'SubmitFormDataInput' } },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'submitForm' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubmitFormMutation, SubmitFormMutationVariables>
export const FormSubmissionListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FormSubmissionList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationFilter' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationSorting' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lang' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SupportedLanguages' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'formSubmissions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'form' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                    arguments: [
                                      {
                                        kind: 'Argument',
                                        name: { kind: 'Name', value: 'where' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'language' },
                                              value: {
                                                kind: 'Variable',
                                                name: { kind: 'Name', value: 'lang' },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'template' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                          arguments: [
                                            {
                                              kind: 'Argument',
                                              name: { kind: 'Name', value: 'where' },
                                              value: {
                                                kind: 'ObjectValue',
                                                fields: [
                                                  {
                                                    kind: 'ObjectField',
                                                    name: { kind: 'Name', value: 'language' },
                                                    value: {
                                                      kind: 'Variable',
                                                      name: { kind: 'Name', value: 'lang' },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'data' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FormSubmissionListQuery, FormSubmissionListQueryVariables>
export const EditTemplateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'EditTemplate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'template' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fields' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bannerOffset' } },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'name' },
                  name: { kind: 'Name', value: 'name_i18n' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'description' },
                  name: { kind: 'Name', value: 'description_i18n' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'defaultSubmitLimit' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditTemplateQuery, EditTemplateQueryVariables>
export const UpdateTemplateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateTemplate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateTemplateWhereInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateTemplateDataInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateTemplate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTemplateMutation, UpdateTemplateMutationVariables>
export const TemplateListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TemplateList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationFilter' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationSorting' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'lang' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'SupportedLanguages' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'templates' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'before' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasNextPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasPreviousPage' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'endCursor' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'startCursor' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'language' },
                                        value: {
                                          kind: 'Variable',
                                          name: { kind: 'Name', value: 'lang' },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TemplateListQuery, TemplateListQueryVariables>
export const CreateTemplateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateTemplate' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTemplate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTemplateMutation, CreateTemplateMutationVariables>
export const AuthRouteGuardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'AuthRouteGuard' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'viewer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthRouteGuardQuery, AuthRouteGuardQueryVariables>
