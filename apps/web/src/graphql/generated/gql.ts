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
  '\n    query AccountMenuViewer {\n      viewer {\n        id\n        discord {\n          id\n          name: global_name\n          avatar\n        }\n      }\n    }\n  ':
    types.AccountMenuViewerDocument,
  '\n    query PublicLayoutViewer {\n      viewer {\n        id\n        roles\n      }\n    }\n  ':
    types.PublicLayoutViewerDocument,
  '\n    query PostOauthViewer {\n      viewer {\n        id\n      }\n    }\n  ':
    types.PostOauthViewerDocument,
  '\n    mutation UpdateForm($where: UpdateFormWhereInput!, $data: UpdateFormDataInput!) {\n      updateForm(where: $where, data: $data) {\n        id\n      }\n    }\n  ':
    types.UpdateFormDocument,
  '\n    query EditForm($where: WhereIdInput!) {\n      form(where: $where) {\n        id\n        name\n        template {\n          id\n        }\n      }\n    }\n  ':
    types.EditFormDocument,
  '\n    query FormList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      forms(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            createdAt\n            updatedAt\n            name\n            template {\n              id\n              name\n              banner\n              bannerOffset\n            }\n          }\n        }\n      }\n    }\n  ':
    types.FormListDocument,
  '\n    mutation CreateForm($input: CreateFormInput!) {\n      createForm(input: $input) {\n        id\n      }\n    }\n  ':
    types.CreateFormDocument,
  '\n    query SearchTemplates(\n      $filter: [PaginationFilter!]\n      $first: Int\n      $after: String\n      $before: String\n      $last: Int\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        filter: $filter\n        first: $first\n        after: $after\n        before: $before\n        last: $last\n        sort: $sort\n      ) {\n        pageInfo {\n          endCursor\n          startCursor\n          hasNextPage\n          hasPreviousPage\n          totalCount\n        }\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  ':
    types.SearchTemplatesDocument,
  '\n    query FormSubmit($where: WhereIdInput!) {\n      form(where: $where) {\n        id\n        name\n        banner\n        template {\n          id\n          fields\n          description\n        }\n      }\n    }\n  ':
    types.FormSubmitDocument,
  '\n    mutation SubmitForm($where: SubmitFormWhereInput!, $data: [SubmitFormDataInput!]!) {\n      submitForm(where: $where, data: $data)\n    }\n  ':
    types.SubmitFormDocument,
  '\n    query FormSubmissionList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      formSubmissions(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            createdAt\n            form {\n              id\n              name\n              template {\n                id\n                name\n              }\n            }\n            data {\n              name\n              value\n            }\n          }\n        }\n      }\n    }\n  ':
    types.FormSubmissionListDocument,
  '\n    query EditTemplate($id: ID!) {\n      template(where: { id: $id }) {\n        id\n        updatedAt\n        name\n        banner\n        description\n        fields\n        bannerOffset\n      }\n    }\n  ':
    types.EditTemplateDocument,
  '\n    mutation UpdateTemplate($where: UpdateTemplateWhereInput!, $data: UpdateTemplateDataInput!) {\n      updateTemplate(where: $where, data: $data) {\n        id\n      }\n    }\n  ':
    types.UpdateTemplateDocument,
  '\n    query TemplateList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            name\n            updatedAt\n            banner\n          }\n        }\n      }\n    }\n  ':
    types.TemplateListDocument,
  '\n    mutation CreateTemplate {\n      createTemplate {\n        id\n      }\n    }\n  ':
    types.CreateTemplateDocument,
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
  source: '\n    query AccountMenuViewer {\n      viewer {\n        id\n        discord {\n          id\n          name: global_name\n          avatar\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query AccountMenuViewer {\n      viewer {\n        id\n        discord {\n          id\n          name: global_name\n          avatar\n        }\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query PublicLayoutViewer {\n      viewer {\n        id\n        roles\n      }\n    }\n  '
): (typeof documents)['\n    query PublicLayoutViewer {\n      viewer {\n        id\n        roles\n      }\n    }\n  ']
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
  source: '\n    mutation UpdateForm($where: UpdateFormWhereInput!, $data: UpdateFormDataInput!) {\n      updateForm(where: $where, data: $data) {\n        id\n      }\n    }\n  '
): (typeof documents)['\n    mutation UpdateForm($where: UpdateFormWhereInput!, $data: UpdateFormDataInput!) {\n      updateForm(where: $where, data: $data) {\n        id\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query EditForm($where: WhereIdInput!) {\n      form(where: $where) {\n        id\n        name\n        template {\n          id\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query EditForm($where: WhereIdInput!) {\n      form(where: $where) {\n        id\n        name\n        template {\n          id\n        }\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FormList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      forms(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            createdAt\n            updatedAt\n            name\n            template {\n              id\n              name\n              banner\n              bannerOffset\n            }\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query FormList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      forms(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            createdAt\n            updatedAt\n            name\n            template {\n              id\n              name\n              banner\n              bannerOffset\n            }\n          }\n        }\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation CreateForm($input: CreateFormInput!) {\n      createForm(input: $input) {\n        id\n      }\n    }\n  '
): (typeof documents)['\n    mutation CreateForm($input: CreateFormInput!) {\n      createForm(input: $input) {\n        id\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query SearchTemplates(\n      $filter: [PaginationFilter!]\n      $first: Int\n      $after: String\n      $before: String\n      $last: Int\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        filter: $filter\n        first: $first\n        after: $after\n        before: $before\n        last: $last\n        sort: $sort\n      ) {\n        pageInfo {\n          endCursor\n          startCursor\n          hasNextPage\n          hasPreviousPage\n          totalCount\n        }\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query SearchTemplates(\n      $filter: [PaginationFilter!]\n      $first: Int\n      $after: String\n      $before: String\n      $last: Int\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        filter: $filter\n        first: $first\n        after: $after\n        before: $before\n        last: $last\n        sort: $sort\n      ) {\n        pageInfo {\n          endCursor\n          startCursor\n          hasNextPage\n          hasPreviousPage\n          totalCount\n        }\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FormSubmit($where: WhereIdInput!) {\n      form(where: $where) {\n        id\n        name\n        banner\n        template {\n          id\n          fields\n          description\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query FormSubmit($where: WhereIdInput!) {\n      form(where: $where) {\n        id\n        name\n        banner\n        template {\n          id\n          fields\n          description\n        }\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation SubmitForm($where: SubmitFormWhereInput!, $data: [SubmitFormDataInput!]!) {\n      submitForm(where: $where, data: $data)\n    }\n  '
): (typeof documents)['\n    mutation SubmitForm($where: SubmitFormWhereInput!, $data: [SubmitFormDataInput!]!) {\n      submitForm(where: $where, data: $data)\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query FormSubmissionList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      formSubmissions(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            createdAt\n            form {\n              id\n              name\n              template {\n                id\n                name\n              }\n            }\n            data {\n              name\n              value\n            }\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query FormSubmissionList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      formSubmissions(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            createdAt\n            form {\n              id\n              name\n              template {\n                id\n                name\n              }\n            }\n            data {\n              name\n              value\n            }\n          }\n        }\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query EditTemplate($id: ID!) {\n      template(where: { id: $id }) {\n        id\n        updatedAt\n        name\n        banner\n        description\n        fields\n        bannerOffset\n      }\n    }\n  '
): (typeof documents)['\n    query EditTemplate($id: ID!) {\n      template(where: { id: $id }) {\n        id\n        updatedAt\n        name\n        banner\n        description\n        fields\n        bannerOffset\n      }\n    }\n  ']
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
  source: '\n    query TemplateList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            name\n            updatedAt\n            banner\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query TemplateList(\n      $first: Int\n      $last: Int\n      $after: String\n      $before: String\n      $filter: [PaginationFilter!]\n      $sort: [PaginationSorting!]\n    ) {\n      templates(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        filter: $filter\n        sort: $sort\n      ) {\n        pageInfo {\n          totalCount\n          hasNextPage\n          hasPreviousPage\n          endCursor\n          startCursor\n        }\n        edges {\n          node {\n            id\n            name\n            updatedAt\n            banner\n          }\n        }\n      }\n    }\n  ']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation CreateTemplate {\n      createTemplate {\n        id\n      }\n    }\n  '
): (typeof documents)['\n    mutation CreateTemplate {\n      createTemplate {\n        id\n      }\n    }\n  ']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
