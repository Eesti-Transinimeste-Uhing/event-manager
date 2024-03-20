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
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any }
}

export type CreateTemplateInput = {
  fields: Array<FormFieldKind>
}

export type DiscordUser = {
  __typename?: 'DiscordUser'
  id?: Maybe<Scalars['ID']['output']>
}

export enum FormFieldKind {
  Age = 'Age',
  ConfirmEvent = 'ConfirmEvent',
  Email = 'Email',
  Gender = 'Gender',
  PreferredName = 'PreferredName',
}

export type Mutation = {
  __typename?: 'Mutation'
  createTemplate?: Maybe<Template>
  submitForm?: Maybe<Scalars['Boolean']['output']>
}

export type MutationCreateTemplateArgs = {
  input: CreateTemplateInput
}

export type MutationSubmitFormArgs = {
  input: SubmitFormInput
}

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']['output']>
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output']
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output']
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  templates?: Maybe<TemplateConnection>
  viewer?: Maybe<User>
}

export type QueryTemplatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type SubmitFormInput = {
  id: Scalars['ID']['input']
}

export type Template = {
  __typename?: 'Template'
  banner?: Maybe<Scalars['URL']['output']>
  description?: Maybe<Scalars['String']['output']>
  fields?: Maybe<Array<Maybe<FormFieldKind>>>
  id?: Maybe<Scalars['ID']['output']>
}

export type TemplateConnection = {
  __typename?: 'TemplateConnection'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TemplateEdge>>>
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo
}

export type TemplateEdge = {
  __typename?: 'TemplateEdge'
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String']['output']
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Template>
}

export type User = {
  __typename?: 'User'
  id?: Maybe<Scalars['ID']['output']>
}

export type PostOauthViewerQueryVariables = Exact<{ [key: string]: never }>

export type PostOauthViewerQuery = {
  __typename?: 'Query'
  viewer?: { __typename?: 'User'; id?: string | null } | null
}

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
