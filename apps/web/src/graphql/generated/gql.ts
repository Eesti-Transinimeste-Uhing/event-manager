/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n    query PostOauthViewer {\n      viewer {\n        id\n      }\n    }\n  ':
    types.PostOauthViewerDocument,
  '\n    query EditTemplate($id: ID!) {\n      template(where: { id: $id }) {\n        id\n        name\n        banner\n        description\n        fields\n      }\n    }\n  ':
    types.EditTemplateDocument,
  '\n    mutation UpdateTemplate($where: UpdateTemplateWhereInput!, $data: UpdateTemplateDataInput!) {\n      updateTemplate(where: $where, data: $data) {\n        id\n      }\n    }\n  ':
    types.UpdateTemplateDocument,
  '\n    query TemplateList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            name\n            updatedAt\n            banner\n            description\n            fields\n          }\n        }\n      }\n    }\n  ':
    types.TemplateListDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query PostOauthViewer {\n      viewer {\n        id\n      }\n    }\n  '
): (typeof documents)['\n    query PostOauthViewer {\n      viewer {\n        id\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query EditTemplate($id: ID!) {\n      template(where: { id: $id }) {\n        id\n        name\n        banner\n        description\n        fields\n      }\n    }\n  '
): (typeof documents)['\n    query EditTemplate($id: ID!) {\n      template(where: { id: $id }) {\n        id\n        name\n        banner\n        description\n        fields\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation UpdateTemplate($where: UpdateTemplateWhereInput!, $data: UpdateTemplateDataInput!) {\n      updateTemplate(where: $where, data: $data) {\n        id\n      }\n    }\n  '
): (typeof documents)['\n    mutation UpdateTemplate($where: UpdateTemplateWhereInput!, $data: UpdateTemplateDataInput!) {\n      updateTemplate(where: $where, data: $data) {\n        id\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query TemplateList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            name\n            updatedAt\n            banner\n            description\n            fields\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query TemplateList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            name\n            updatedAt\n            banner\n            description\n            fields\n          }\n        }\n      }\n    }\n  ']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
