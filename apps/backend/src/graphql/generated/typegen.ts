/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { GraphqlContext } from './../context'
import type { User } from './../../entity/user'
import type { Template } from './../../entity/template'
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
  SubmitFormInput: {
    // input type
    id: string // ID!
  }
  UpdateTemplateDataInput: {
    // input type
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
}

export interface NexusGenObjects {
  DiscordUser: {
    // root type
    id: string // ID!
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
    id: string // ID!
  }
  Mutation: {
    // field return type
    createTemplate: NexusGenRootTypes['Template'] // Template!
    submitForm: boolean // Boolean!
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
    template: NexusGenRootTypes['Template'] | null // Template
    templates: NexusGenRootTypes['TemplateConnection'] // TemplateConnection!
    viewer: NexusGenRootTypes['User'] | null // User
  }
  Template: {
    // field return type
    banner: NexusGenScalars['URL'] | null // URL
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
    id: string // ID!
  }
}

export interface NexusGenFieldTypeNames {
  DiscordUser: {
    // field return type name
    id: 'ID'
  }
  Mutation: {
    // field return type name
    createTemplate: 'Template'
    submitForm: 'Boolean'
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
    template: 'Template'
    templates: 'TemplateConnection'
    viewer: 'User'
  }
  Template: {
    // field return type name
    banner: 'URL'
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
    id: 'ID'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    submitForm: {
      // args
      input: NexusGenInputs['SubmitFormInput'] // SubmitFormInput!
    }
    updateTemplate: {
      // args
      data: NexusGenInputs['UpdateTemplateDataInput'] // UpdateTemplateDataInput!
      where: NexusGenInputs['UpdateTemplateWhereInput'] // UpdateTemplateWhereInput!
    }
  }
  Query: {
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
