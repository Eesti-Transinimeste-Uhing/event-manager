/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { GraphqlContext } from './../context'
import type { DiscordOauthInfo } from './../../lib/discord-me'
import type { User } from './../../entity/user'
import type { Template } from './../../entity/template'
import type { Form } from './../../entity/form'
import type { core, connectionPluginCore } from 'nexus'
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "URL";
    /**
     * A DateTime value consumable with Luxon
     */
    dateTime<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "Upload";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "URL";
    /**
     * A DateTime value consumable with Luxon
     */
    dateTime<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "DateTime";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "Upload";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateFormInput: {
    // input type
    templateId: string // ID!
  }
  PaginationFilter: {
    // input type
    column: string // String!
    filter: string // String!
  }
  PaginationSorting: {
    // input type
    order: NexusGenEnums['PaginationSortingOrder'] // PaginationSortingOrder!
    sort: string // String!
  }
  RemoveFormInput: {
    // input type
    id: string // ID!
  }
  RemoveTemplateInput: {
    // input type
    id: string // ID!
  }
  SubmitFormInput: {
    // input type
    id: string // ID!
  }
  UpdateFormDataInput: {
    // input type
    name: string // String!
    templateId: string // ID!
  }
  UpdateFormWhereInput: {
    // input type
    id: string // ID!
  }
  UpdateTemplateDataInput: {
    // input type
    banner?: NexusGenScalars['Upload'] | null // Upload
    bannerOffset: number // Int!
    description: string // String!
    fields: NexusGenEnums['FormFieldKind'][] // [FormFieldKind!]!
    name: string // String!
  }
  UpdateTemplateWhereInput: {
    // input type
    id: string // ID!
  }
  WhereIdInput: {
    // input type
    id: string // ID!
  }
}

export interface NexusGenEnums {
  FormFieldKind: 2 | 4 | 1 | 3 | 0
  PaginationSortingOrder: 'ASC' | 'DESC'
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  URL: any
  Upload: any
}

export interface NexusGenObjects {
  DiscordUser: DiscordOauthInfo
  Form: Form
  FormConnection: {
    // root type
    edges: NexusGenRootTypes['FormEdge'][] // [FormEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  FormEdge: {
    // root type
    cursor: string // String!
    node: NexusGenRootTypes['Form'] // Form!
  }
  Mutation: {}
  PageInfo: {
    // root type
    endCursor?: string | null // String
    hasNextPage?: boolean | null // Boolean
    hasPreviousPage?: boolean | null // Boolean
    startCursor?: string | null // String
    totalCount?: number | null // Int
  }
  Query: {}
  Template: Template
  TemplateConnection: {
    // root type
    edges: NexusGenRootTypes['TemplateEdge'][] // [TemplateEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  TemplateEdge: {
    // root type
    cursor: string // String!
    node: NexusGenRootTypes['Template'] // Template!
  }
  User: User
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  DiscordUser: {
    // field return type
    avatar: NexusGenScalars['URL'] // URL!
    banner_color: string // String!
    global_name: string // String!
    id: string // ID!
    locale: string // String!
    username: string // String!
  }
  Form: {
    // field return type
    createdAt: NexusGenScalars['DateTime'] // DateTime!
    id: string // ID!
    name: string // String!
    template: NexusGenRootTypes['Template'] // Template!
    updatedAt: NexusGenScalars['DateTime'] // DateTime!
  }
  FormConnection: {
    // field return type
    edges: NexusGenRootTypes['FormEdge'][] // [FormEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  FormEdge: {
    // field return type
    cursor: string // String!
    node: NexusGenRootTypes['Form'] // Form!
  }
  Mutation: {
    // field return type
    createForm: NexusGenRootTypes['Form'] // Form!
    createTemplate: NexusGenRootTypes['Template'] // Template!
    removeForm: boolean // Boolean!
    removeTemplate: boolean // Boolean!
    submitForm: boolean // Boolean!
    updateForm: NexusGenRootTypes['Form'] | null // Form
    updateTemplate: NexusGenRootTypes['Template'] | null // Template
  }
  PageInfo: {
    // field return type
    endCursor: string | null // String
    hasNextPage: boolean | null // Boolean
    hasPreviousPage: boolean | null // Boolean
    startCursor: string | null // String
    totalCount: number | null // Int
  }
  Query: {
    // field return type
    form: NexusGenRootTypes['Form'] | null // Form
    forms: NexusGenRootTypes['FormConnection'] // FormConnection!
    template: NexusGenRootTypes['Template'] | null // Template
    templates: NexusGenRootTypes['TemplateConnection'] // TemplateConnection!
    viewer: NexusGenRootTypes['User'] | null // User
  }
  Template: {
    // field return type
    banner: NexusGenScalars['URL'] // URL!
    bannerOffset: number // Int!
    createdAt: NexusGenScalars['DateTime'] // DateTime!
    description: string // String!
    fields: NexusGenEnums['FormFieldKind'][] // [FormFieldKind!]!
    id: string // ID!
    name: string // String!
    updatedAt: NexusGenScalars['DateTime'] // DateTime!
  }
  TemplateConnection: {
    // field return type
    edges: NexusGenRootTypes['TemplateEdge'][] // [TemplateEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  TemplateEdge: {
    // field return type
    cursor: string // String!
    node: NexusGenRootTypes['Template'] // Template!
  }
  User: {
    // field return type
    discord: NexusGenRootTypes['DiscordUser'] // DiscordUser!
    id: string // ID!
  }
}

export interface NexusGenFieldTypeNames {
  DiscordUser: {
    // field return type name
    avatar: 'URL'
    banner_color: 'String'
    global_name: 'String'
    id: 'ID'
    locale: 'String'
    username: 'String'
  }
  Form: {
    // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    template: 'Template'
    updatedAt: 'DateTime'
  }
  FormConnection: {
    // field return type name
    edges: 'FormEdge'
    pageInfo: 'PageInfo'
  }
  FormEdge: {
    // field return type name
    cursor: 'String'
    node: 'Form'
  }
  Mutation: {
    // field return type name
    createForm: 'Form'
    createTemplate: 'Template'
    removeForm: 'Boolean'
    removeTemplate: 'Boolean'
    submitForm: 'Boolean'
    updateForm: 'Form'
    updateTemplate: 'Template'
  }
  PageInfo: {
    // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
    totalCount: 'Int'
  }
  Query: {
    // field return type name
    form: 'Form'
    forms: 'FormConnection'
    template: 'Template'
    templates: 'TemplateConnection'
    viewer: 'User'
  }
  Template: {
    // field return type name
    banner: 'URL'
    bannerOffset: 'Int'
    createdAt: 'DateTime'
    description: 'String'
    fields: 'FormFieldKind'
    id: 'ID'
    name: 'String'
    updatedAt: 'DateTime'
  }
  TemplateConnection: {
    // field return type name
    edges: 'TemplateEdge'
    pageInfo: 'PageInfo'
  }
  TemplateEdge: {
    // field return type name
    cursor: 'String'
    node: 'Template'
  }
  User: {
    // field return type name
    discord: 'DiscordUser'
    id: 'ID'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createForm: {
      // args
      input: NexusGenInputs['CreateFormInput'] // CreateFormInput!
    }
    removeForm: {
      // args
      input: NexusGenInputs['RemoveFormInput'] // RemoveFormInput!
    }
    removeTemplate: {
      // args
      input: NexusGenInputs['RemoveTemplateInput'] // RemoveTemplateInput!
    }
    submitForm: {
      // args
      input: NexusGenInputs['SubmitFormInput'] // SubmitFormInput!
    }
    updateForm: {
      // args
      data: NexusGenInputs['UpdateFormDataInput'] // UpdateFormDataInput!
      where: NexusGenInputs['UpdateFormWhereInput'] // UpdateFormWhereInput!
    }
    updateTemplate: {
      // args
      data: NexusGenInputs['UpdateTemplateDataInput'] // UpdateTemplateDataInput!
      where: NexusGenInputs['UpdateTemplateWhereInput'] // UpdateTemplateWhereInput!
    }
  }
  Query: {
    form: {
      // args
      where: NexusGenInputs['WhereIdInput'] // WhereIdInput!
    }
    forms: {
      // args
      after?: string | null // String
      before?: string | null // String
      filter?: NexusGenInputs['PaginationFilter'][] | null // [PaginationFilter!]
      first?: number | null // Int
      last?: number | null // Int
      sort?: NexusGenInputs['PaginationSorting'][] | null // [PaginationSorting!]
    }
    template: {
      // args
      where: NexusGenInputs['WhereIdInput'] // WhereIdInput!
    }
    templates: {
      // args
      after?: string | null // String
      before?: string | null // String
      filter?: NexusGenInputs['PaginationFilter'][] | null // [PaginationFilter!]
      first?: number | null // Int
      last?: number | null // Int
      sort?: NexusGenInputs['PaginationSorting'][] | null // [PaginationSorting!]
    }
  }
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = never

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: GraphqlContext
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  fieldTypeNames: NexusGenFieldTypeNames
  allTypes: NexusGenAllTypes
  typeInterfaces: NexusGenTypeInterfaces
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractTypeMembers: NexusGenAbstractTypeMembers
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType
  features: NexusGenFeaturesConfig
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}
