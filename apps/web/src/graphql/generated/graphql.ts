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
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any }
}

export type CreateFormInput = {
  templateId: Scalars['ID']['input']
}

export type DiscordUser = {
  __typename?: 'DiscordUser'
  id: Scalars['ID']['output']
}

export type Form = {
  __typename?: 'Form'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  template: Template
  updatedAt: Scalars['DateTime']['output']
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

export type Mutation = {
  __typename?: 'Mutation'
  createForm: Form
  createTemplate: Template
  submitForm: Scalars['Boolean']['output']
  updateTemplate?: Maybe<Template>
}

export type MutationCreateFormArgs = {
  input: CreateFormInput
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
  form?: Maybe<Form>
  forms: FormConnection
  template?: Maybe<Template>
  templates: TemplateConnection
  viewer?: Maybe<User>
}

export type QueryFormArgs = {
  where: WhereIdInput
}

export type QueryFormsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<Array<PaginationFilter>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<PaginationSorting>>
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
  banner: Scalars['URL']['output']
  bannerOffset: Scalars['Int']['output']
  createdAt: Scalars['DateTime']['output']
  description: Scalars['String']['output']
  fields: Array<FormFieldKind>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
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

export type UpdateTemplateDataInput = {
  banner?: InputMaybe<Scalars['Upload']['input']>
  bannerOffset: Scalars['Int']['input']
  description: Scalars['String']['input']
  fields: Array<FormFieldKind>
  name: Scalars['String']['input']
}

export type UpdateTemplateWhereInput = {
  id: Scalars['ID']['input']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']['output']
}

export type WhereIdInput = {
  id: Scalars['ID']['input']
}

export type PostOauthViewerQueryVariables = Exact<{ [key: string]: never }>

export type PostOauthViewerQuery = {
  __typename?: 'Query'
  viewer?: { __typename?: 'User'; id: string } | null
}

export type FormListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<Array<PaginationFilter> | PaginationFilter>
  sort?: InputMaybe<Array<PaginationSorting> | PaginationSorting>
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

export type EditTemplateQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type EditTemplateQuery = {
  __typename?: 'Query'
  template?: {
    __typename?: 'Template'
    id: string
    updatedAt: any
    name: string
    banner: any
    description: string
    fields: Array<FormFieldKind>
    bannerOffset: number
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
  filter?: InputMaybe<Array<PaginationFilter> | PaginationFilter>
  sort?: InputMaybe<Array<PaginationSorting> | PaginationSorting>
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
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationFilter' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationSorting' } },
            },
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
                              name: { kind: 'Name', value: 'template' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'banner' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'fields' } },
                { kind: 'Field', name: { kind: 'Name', value: 'bannerOffset' } },
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
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationFilter' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationSorting' } },
            },
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
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
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
