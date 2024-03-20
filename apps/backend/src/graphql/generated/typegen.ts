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
  CreateTemplateInput: {
    // input type
    fields: NexusGenEnums['FormFieldKind'][] // [FormFieldKind!]!
  }
  SubmitFormInput: {
    // input type
    id: string // ID!
  }
}

export interface NexusGenEnums {
  FormFieldKind: 2 | 4 | 1 | 3 | 0
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  URL: any
}

export interface NexusGenObjects {
  DiscordUser: {
    // root type
    id?: string | null // ID
  }
  Mutation: {}
  PageInfo: {
    // root type
    endCursor?: string | null // String
    hasNextPage: boolean // Boolean!
    hasPreviousPage: boolean // Boolean!
    startCursor?: string | null // String
  }
  Query: {}
  Template: Template
  TemplateConnection: {
    // root type
    edges?: Array<NexusGenRootTypes['TemplateEdge'] | null> | null // [TemplateEdge]
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  TemplateEdge: {
    // root type
    cursor: string // String!
    node?: NexusGenRootTypes['Template'] | null // Template
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
    id: string | null // ID
  }
  Mutation: {
    // field return type
    createTemplate: NexusGenRootTypes['Template'] | null // Template
    submitForm: boolean | null // Boolean
  }
  PageInfo: {
    // field return type
    endCursor: string | null // String
    hasNextPage: boolean // Boolean!
    hasPreviousPage: boolean // Boolean!
    startCursor: string | null // String
  }
  Query: {
    // field return type
    templates: NexusGenRootTypes['TemplateConnection'] | null // TemplateConnection
    viewer: NexusGenRootTypes['User'] | null // User
  }
  Template: {
    // field return type
    banner: NexusGenScalars['URL'] | null // URL
    description: string | null // String
    fields: Array<NexusGenEnums['FormFieldKind'] | null> | null // [FormFieldKind]
    id: string | null // ID
  }
  TemplateConnection: {
    // field return type
    edges: Array<NexusGenRootTypes['TemplateEdge'] | null> | null // [TemplateEdge]
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  TemplateEdge: {
    // field return type
    cursor: string // String!
    node: NexusGenRootTypes['Template'] | null // Template
  }
  User: {
    // field return type
    id: string | null // ID
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
  }
  PageInfo: {
    // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: {
    // field return type name
    templates: 'TemplateConnection'
    viewer: 'User'
  }
  Template: {
    // field return type name
    banner: 'URL'
    description: 'String'
    fields: 'FormFieldKind'
    id: 'ID'
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
    createTemplate: {
      // args
      input: NexusGenInputs['CreateTemplateInput'] // CreateTemplateInput!
    }
    submitForm: {
      // args
      input: NexusGenInputs['SubmitFormInput'] // SubmitFormInput!
    }
  }
  Query: {
    templates: {
      // args
      after?: string | null // String
      before?: string | null // String
      first?: number | null // Int
      last?: number | null // Int
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
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
