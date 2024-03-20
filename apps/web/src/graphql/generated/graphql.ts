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
  updateTemplate?: Maybe<Template>
}

export type MutationSubmitFormArgs = {
  input: SubmitFormInput
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
  column: Scalars['String']['input']
  filter: Scalars['String']['input']
}

export type PaginationSorting = {
  order: PaginationSortingOrder
  sort: Scalars['String']['input']
}

export enum PaginationSortingOrder {
  Asc = 'Asc',
  Desc = 'Desc',
}

export type Query = {
  __typename?: 'Query'
  template?: Maybe<Template>
  templates?: Maybe<TemplateConnection>
  viewer?: Maybe<User>
}

export type QueryTemplateArgs = {
  where: WhereIdInput
}

export type QueryTemplatesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<Array<PaginationFilter>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<PaginationSorting>>
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

export type UpdateTemplateDataInput = {
  description: Scalars['String']['input']
  fields: Array<FormFieldKind>
}

export type UpdateTemplateWhereInput = {
  id: Scalars['ID']['input']
}

export type User = {
  __typename?: 'User'
  id?: Maybe<Scalars['ID']['output']>
}

export type WhereIdInput = {
  id: Scalars['ID']['input']
}

export type PostOauthViewerQueryVariables = Exact<{ [key: string]: never }>

export type PostOauthViewerQuery = {
  __typename?: 'Query'
  viewer?: { __typename?: 'User'; id?: string | null } | null
}

export type EditTemplateQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type EditTemplateQuery = {
  __typename?: 'Query'
  template?: { __typename?: 'Template'; id?: string | null } | null
}

export type TemplateListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>
}>

export type TemplateListQuery = {
  __typename?: 'Query'
  templates?: {
    __typename?: 'TemplateConnection'
    edges?: Array<{
      __typename?: 'TemplateEdge'
      cursor: string
      node?: {
        __typename?: 'Template'
        id?: string | null
        banner?: any | null
        description?: string | null
        fields?: Array<FormFieldKind | null> | null
      } | null
    } | null> | null
  } | null
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
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EditTemplateQuery, EditTemplateQueryVariables>
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
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'cursor' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
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
      },
    },
  ],
} as unknown as DocumentNode<TemplateListQuery, TemplateListQueryVariables>
