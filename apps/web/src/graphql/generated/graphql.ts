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
}

export type Mutation = {
  __typename?: 'Mutation'
  discordCallback?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  checkDiscordToken?: Maybe<Scalars['Boolean']['output']>
}

export type User = {
  __typename?: 'User'
  id?: Maybe<Scalars['ID']['output']>
}

export type TestQueryQueryVariables = Exact<{ [key: string]: never }>

export type TestQueryQuery = { __typename?: 'Query'; checkDiscordToken?: boolean | null }

export const TestQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TestQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'checkDiscordToken' } }],
      },
    },
  ],
} as unknown as DocumentNode<TestQueryQuery, TestQueryQueryVariables>
