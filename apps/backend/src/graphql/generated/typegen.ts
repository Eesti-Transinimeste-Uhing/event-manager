/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { DynamicContext } from './../../server/dynamic-context'
import type { DiscordOauthInfo } from './../../lib/discord-me'
import type { User } from './../../entity/user'
import type { Template } from './../../entity/template'
import type { Form } from './../../entity/form'
import type { FormSubmission } from './../../entity/form-submission'
import type { AnnouncerOptionsDiscord } from './../../entity/announcer-options-discord'
import type { Announcer } from './../../entity/announcer'
import type { Job } from 'bullmq'
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
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    jsonObject<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "JSONObject";
    /**
     * An object that contains strings for all supported languages
     */
    i18nJSON<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "I18nJSON";
    /**
     * An object that contains strings for all supported languages
     */
    i18nString<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>
    ): void // "I18nString";
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
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    jsonObject<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "JSONObject";
    /**
     * An object that contains strings for all supported languages
     */
    i18nJSON<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "I18nJSON";
    /**
     * An object that contains strings for all supported languages
     */
    i18nString<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void // "I18nString";
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
  AnnounceFormWhereInput: {
    // input type
    id: string // ID!
  }
  AnnouncerOptionsDiscordInput: {
    // input type
    channelId: string // String!
    guildId: string // String!
  }
  AnnouncerOptionsInput: {
    // input type
    discord: NexusGenInputs['AnnouncerOptionsDiscordInput'] // AnnouncerOptionsDiscordInput!
  }
  CreateAnnouncerData: {
    // input type
    type: NexusGenEnums['AnnouncerType'] // AnnouncerType!
  }
  CreateFormInput: {
    // input type
    templateId: string // ID!
  }
  I18nJSONInput: {
    // input type
    en_GB?: NexusGenScalars['JSONObject'] | null // JSONObject
    et_EE?: NexusGenScalars['JSONObject'] | null // JSONObject
    ru_RU?: NexusGenScalars['JSONObject'] | null // JSONObject
  }
  I18nStringInput: {
    // input type
    en_GB: string // String!
    et_EE: string // String!
    ru_RU: string // String!
  }
  PaginationFilter: {
    // input type
    columns: string[] // [String!]!
    query: string // String!
  }
  PaginationSorting: {
    // input type
    columns: string[] // [String!]!
    order: NexusGenEnums['PaginationSortingOrder'] // PaginationSortingOrder!
  }
  RemoveFormInput: {
    // input type
    id: string // ID!
  }
  RemoveTemplateInput: {
    // input type
    id: string // ID!
  }
  SubmitFormDataInput: {
    // input type
    name: string // String!
    value?: string | null // String
  }
  SubmitFormWhereInput: {
    // input type
    id: string // ID!
  }
  UpdateAnnouncerDataInput: {
    // input type
    name: string // String!
    options: NexusGenInputs['AnnouncerOptionsInput'] // AnnouncerOptionsInput!
  }
  UpdateAnnouncerWhereInput: {
    // input type
    id: string // ID!
  }
  UpdateFormDataInput: {
    // input type
    location: NexusGenInputs['I18nStringInput'] // I18nStringInput!
    name: NexusGenInputs['I18nStringInput'] // I18nStringInput!
    startsAt: NexusGenScalars['DateTime'] // DateTime!
    submitLimit: number // Int!
  }
  UpdateFormWhereInput: {
    // input type
    id: string // ID!
  }
  UpdateTemplateDataInput: {
    // input type
    banner?: NexusGenScalars['Upload'] | null // Upload
    bannerOffset: number // Int!
    defaultSubmitLimit: number // Int!
    description: NexusGenInputs['I18nJSONInput'] // I18nJSONInput!
    fields: NexusGenEnums['FormFieldKind'][] // [FormFieldKind!]!
    name: NexusGenInputs['I18nStringInput'] // I18nStringInput!
  }
  UpdateTemplateWhereInput: {
    // input type
    id: string // ID!
  }
  WhereIdInput: {
    // input type
    id: string // ID!
  }
  WhereLangInput: {
    // input type
    language: NexusGenEnums['SupportedLanguages'] // SupportedLanguages!
  }
}

export interface NexusGenEnums {
  AnnouncerStatus: 1 | 0
  AnnouncerType: 1 | 2 | 3 | 0
  FormFieldKind: 0 | 1 | 2 | 3 | 4
  FormSubmittabilityTag: 1 | 2 | 0
  PaginationSortingOrder: 'ASC' | 'DESC'
  RenderTarget: 2 | 3 | 5 | 1 | 4
  SupportedLanguages: 0 | 1 | 3
  UserRole: 1 | 2 | 0 | 3
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  I18nJSON: any
  I18nString: any
  JSONObject: any
  URL: any
  Upload: any
}

export interface NexusGenObjects {
  Announcer: Announcer
  AnnouncerConnection: {
    // root type
    edges: NexusGenRootTypes['AnnouncerEdge'][] // [AnnouncerEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  AnnouncerEdge: {
    // root type
    cursor: string // String!
    node: NexusGenRootTypes['Announcer'] // Announcer!
  }
  AnnouncerOptionsDiscord: AnnouncerOptionsDiscord
  AnnouncerReadiness: {
    // root type
    status: NexusGenEnums['AnnouncerStatus'] // AnnouncerStatus!
  }
  BullJob: Job
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
  FormSubmission: FormSubmission
  FormSubmissionConnection: {
    // root type
    edges: NexusGenRootTypes['FormSubmissionEdge'][] // [FormSubmissionEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  FormSubmissionData: {
    // root type
    name: string // String!
    value?: string | null // String
  }
  FormSubmissionEdge: {
    // root type
    cursor: string // String!
    node: NexusGenRootTypes['FormSubmission'] // FormSubmission!
  }
  FormSubmittability: {
    // root type
    submittable: boolean // Boolean!
    tags: NexusGenEnums['FormSubmittabilityTag'][] // [FormSubmittabilityTag!]!
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
  Subscription: {}
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

export interface NexusGenUnions {
  AnnouncerOptions: NexusGenRootTypes['AnnouncerOptionsDiscord']
}

export type NexusGenRootTypes = NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Announcer: {
    // field return type
    createdAt: NexusGenScalars['DateTime'] // DateTime!
    id: string // ID!
    name: string // String!
    options: NexusGenRootTypes['AnnouncerOptions'] | null // AnnouncerOptions
    readiness: NexusGenRootTypes['AnnouncerReadiness'] // AnnouncerReadiness!
    type: NexusGenEnums['AnnouncerType'] // AnnouncerType!
    updatedAt: NexusGenScalars['DateTime'] // DateTime!
  }
  AnnouncerConnection: {
    // field return type
    edges: NexusGenRootTypes['AnnouncerEdge'][] // [AnnouncerEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  AnnouncerEdge: {
    // field return type
    cursor: string // String!
    node: NexusGenRootTypes['Announcer'] // Announcer!
  }
  AnnouncerOptionsDiscord: {
    // field return type
    channelId: string // String!
    guildId: string // String!
  }
  AnnouncerReadiness: {
    // field return type
    status: NexusGenEnums['AnnouncerStatus'] // AnnouncerStatus!
  }
  BullJob: {
    // field return type
    attemptsMade: number // Int!
    delay: number // Int!
    finishedOn: NexusGenScalars['DateTime'] | null // DateTime
    id: string // String!
    name: string // String!
    processedOn: NexusGenScalars['DateTime'] | null // DateTime
    progress: string // String!
    timestamp: NexusGenScalars['DateTime'] // DateTime!
  }
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
    banner: NexusGenScalars['URL'] // URL!
    createdAt: NexusGenScalars['DateTime'] // DateTime!
    description: string // String!
    description_i18n: NexusGenScalars['I18nJSON'] // I18nJSON!
    id: string // ID!
    location: string | null // String
    location_i18n: NexusGenScalars['I18nString'] // I18nString!
    name: string | null // String
    name_i18n: NexusGenScalars['I18nString'] // I18nString!
    startsAt: NexusGenScalars['DateTime'] | null // DateTime
    submitLimit: number // Int!
    submittability: NexusGenRootTypes['FormSubmittability'] // FormSubmittability!
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
  FormSubmission: {
    // field return type
    createdAt: NexusGenScalars['DateTime'] // DateTime!
    data: NexusGenRootTypes['FormSubmissionData'][] // [FormSubmissionData!]!
    form: NexusGenRootTypes['Form'] // Form!
    id: string // ID!
  }
  FormSubmissionConnection: {
    // field return type
    edges: NexusGenRootTypes['FormSubmissionEdge'][] // [FormSubmissionEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo'] // PageInfo!
  }
  FormSubmissionData: {
    // field return type
    name: string // String!
    value: string | null // String
  }
  FormSubmissionEdge: {
    // field return type
    cursor: string // String!
    node: NexusGenRootTypes['FormSubmission'] // FormSubmission!
  }
  FormSubmittability: {
    // field return type
    submittable: boolean // Boolean!
    tags: NexusGenEnums['FormSubmittabilityTag'][] // [FormSubmittabilityTag!]!
  }
  Mutation: {
    // field return type
    announceForm: NexusGenRootTypes['BullJob'] // BullJob!
    createAnnouncer: NexusGenRootTypes['Announcer'] // Announcer!
    createForm: NexusGenRootTypes['Form'] // Form!
    createTemplate: NexusGenRootTypes['Template'] // Template!
    removeForm: boolean // Boolean!
    removeTemplate: boolean // Boolean!
    submitForm: boolean // Boolean!
    updateAnnouncer: NexusGenRootTypes['Announcer'] | null // Announcer
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
    announcer: NexusGenRootTypes['Announcer'] | null // Announcer
    announcers: NexusGenRootTypes['AnnouncerConnection'] // AnnouncerConnection!
    form: NexusGenRootTypes['Form'] | null // Form
    formSubmissions: NexusGenRootTypes['FormSubmissionConnection'] // FormSubmissionConnection!
    forms: NexusGenRootTypes['FormConnection'] // FormConnection!
    template: NexusGenRootTypes['Template'] | null // Template
    templates: NexusGenRootTypes['TemplateConnection'] // TemplateConnection!
    viewer: NexusGenRootTypes['User'] | null // User
  }
  Subscription: {
    // field return type
    test: string // String!
  }
  Template: {
    // field return type
    banner: NexusGenScalars['URL'] // URL!
    bannerOffset: number // Int!
    createdAt: NexusGenScalars['DateTime'] // DateTime!
    defaultSubmitLimit: number // Int!
    description: NexusGenScalars['JSONObject'] | null // JSONObject
    description_i18n: NexusGenScalars['I18nJSON'] // I18nJSON!
    fields: NexusGenEnums['FormFieldKind'][] // [FormFieldKind!]!
    id: string // ID!
    name: string // String!
    name_i18n: NexusGenScalars['I18nString'] // I18nString!
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
    roles: NexusGenEnums['UserRole'][] // [UserRole!]!
  }
}

export interface NexusGenFieldTypeNames {
  Announcer: {
    // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    name: 'String'
    options: 'AnnouncerOptions'
    readiness: 'AnnouncerReadiness'
    type: 'AnnouncerType'
    updatedAt: 'DateTime'
  }
  AnnouncerConnection: {
    // field return type name
    edges: 'AnnouncerEdge'
    pageInfo: 'PageInfo'
  }
  AnnouncerEdge: {
    // field return type name
    cursor: 'String'
    node: 'Announcer'
  }
  AnnouncerOptionsDiscord: {
    // field return type name
    channelId: 'String'
    guildId: 'String'
  }
  AnnouncerReadiness: {
    // field return type name
    status: 'AnnouncerStatus'
  }
  BullJob: {
    // field return type name
    attemptsMade: 'Int'
    delay: 'Int'
    finishedOn: 'DateTime'
    id: 'String'
    name: 'String'
    processedOn: 'DateTime'
    progress: 'String'
    timestamp: 'DateTime'
  }
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
    banner: 'URL'
    createdAt: 'DateTime'
    description: 'String'
    description_i18n: 'I18nJSON'
    id: 'ID'
    location: 'String'
    location_i18n: 'I18nString'
    name: 'String'
    name_i18n: 'I18nString'
    startsAt: 'DateTime'
    submitLimit: 'Int'
    submittability: 'FormSubmittability'
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
  FormSubmission: {
    // field return type name
    createdAt: 'DateTime'
    data: 'FormSubmissionData'
    form: 'Form'
    id: 'ID'
  }
  FormSubmissionConnection: {
    // field return type name
    edges: 'FormSubmissionEdge'
    pageInfo: 'PageInfo'
  }
  FormSubmissionData: {
    // field return type name
    name: 'String'
    value: 'String'
  }
  FormSubmissionEdge: {
    // field return type name
    cursor: 'String'
    node: 'FormSubmission'
  }
  FormSubmittability: {
    // field return type name
    submittable: 'Boolean'
    tags: 'FormSubmittabilityTag'
  }
  Mutation: {
    // field return type name
    announceForm: 'BullJob'
    createAnnouncer: 'Announcer'
    createForm: 'Form'
    createTemplate: 'Template'
    removeForm: 'Boolean'
    removeTemplate: 'Boolean'
    submitForm: 'Boolean'
    updateAnnouncer: 'Announcer'
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
    announcer: 'Announcer'
    announcers: 'AnnouncerConnection'
    form: 'Form'
    formSubmissions: 'FormSubmissionConnection'
    forms: 'FormConnection'
    template: 'Template'
    templates: 'TemplateConnection'
    viewer: 'User'
  }
  Subscription: {
    // field return type name
    test: 'String'
  }
  Template: {
    // field return type name
    banner: 'URL'
    bannerOffset: 'Int'
    createdAt: 'DateTime'
    defaultSubmitLimit: 'Int'
    description: 'JSONObject'
    description_i18n: 'I18nJSON'
    fields: 'FormFieldKind'
    id: 'ID'
    name: 'String'
    name_i18n: 'I18nString'
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
    roles: 'UserRole'
  }
}

export interface NexusGenArgTypes {
  Form: {
    description: {
      // args
      target: NexusGenEnums['RenderTarget'] // RenderTarget!
      where: NexusGenInputs['WhereLangInput'] // WhereLangInput!
    }
    location: {
      // args
      where: NexusGenInputs['WhereLangInput'] // WhereLangInput!
    }
    name: {
      // args
      where: NexusGenInputs['WhereLangInput'] // WhereLangInput!
    }
  }
  Mutation: {
    announceForm: {
      // args
      where: NexusGenInputs['AnnounceFormWhereInput'] // AnnounceFormWhereInput!
    }
    createAnnouncer: {
      // args
      data: NexusGenInputs['CreateAnnouncerData'] // CreateAnnouncerData!
    }
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
      data: NexusGenInputs['SubmitFormDataInput'][] // [SubmitFormDataInput!]!
      where: NexusGenInputs['SubmitFormWhereInput'] // SubmitFormWhereInput!
    }
    updateAnnouncer: {
      // args
      data: NexusGenInputs['UpdateAnnouncerDataInput'] // UpdateAnnouncerDataInput!
      where: NexusGenInputs['UpdateAnnouncerWhereInput'] // UpdateAnnouncerWhereInput!
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
    announcer: {
      // args
      where: NexusGenInputs['WhereIdInput'] // WhereIdInput!
    }
    announcers: {
      // args
      after?: string | null // String
      before?: string | null // String
      filter: NexusGenInputs['PaginationFilter'] // PaginationFilter!
      first?: number | null // Int
      last?: number | null // Int
      sort: NexusGenInputs['PaginationSorting'] // PaginationSorting!
    }
    form: {
      // args
      where: NexusGenInputs['WhereIdInput'] // WhereIdInput!
    }
    formSubmissions: {
      // args
      after?: string | null // String
      before?: string | null // String
      filter: NexusGenInputs['PaginationFilter'] // PaginationFilter!
      first?: number | null // Int
      last?: number | null // Int
      sort: NexusGenInputs['PaginationSorting'] // PaginationSorting!
    }
    forms: {
      // args
      after?: string | null // String
      before?: string | null // String
      filter: NexusGenInputs['PaginationFilter'] // PaginationFilter!
      first?: number | null // Int
      last?: number | null // Int
      sort: NexusGenInputs['PaginationSorting'] // PaginationSorting!
    }
    template: {
      // args
      where: NexusGenInputs['WhereIdInput'] // WhereIdInput!
    }
    templates: {
      // args
      after?: string | null // String
      before?: string | null // String
      filter: NexusGenInputs['PaginationFilter'] // PaginationFilter!
      first?: number | null // Int
      last?: number | null // Int
      sort: NexusGenInputs['PaginationSorting'] // PaginationSorting!
    }
  }
  Template: {
    description: {
      // args
      where: NexusGenInputs['WhereLangInput'] // WhereLangInput!
    }
    name: {
      // args
      where: NexusGenInputs['WhereLangInput'] // WhereLangInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  AnnouncerOptions: 'AnnouncerOptionsDiscord'
}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = keyof NexusGenUnions

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = 'AnnouncerOptions'

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: DynamicContext
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
