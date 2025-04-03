import path from 'node:path'
import { objectType } from 'nexus'
import { formController } from '../../server/static-context'
import { SupportedLanguages } from '@etu/events-proto/generated/lib'

export const Form = objectType({
  name: 'Form',
  sourceType: {
    module: path.resolve(__dirname, '../../entity/form.ts'),
    export: 'Form',
  },
  definition(t) {
    t.id('id')
    t.i18nString('name_i18n', {
      resolve(root, args) {
        return root.name
      },
    })
    t.nullable.string('name', {
      args: {
        where: 'WhereLangInput',
      },
      resolve(root, args) {
        return root.name[SupportedLanguages[args.where.language]]
      },
    })
    t.i18nString('location_i18n', {
      resolve(root, args) {
        return root.location
      },
    })
    t.nullable.string('location', {
      args: {
        where: 'WhereLangInput',
      },
      resolve(root, args) {
        return root.location[SupportedLanguages[args.where.language]]
      },
    })
    t.dateTime('createdAt')
    t.dateTime('updatedAt')
    t.nullable.dateTime('startsAt')
    t.url('banner', {
      resolve(root) {
        return root.bannerUrl
      },
    })
    t.i18nJSON('description_i18n', {
      async resolve(root, args) {
        const template = await root.template

        return template.description
      },
    })
    t.string('description', {
      args: {
        where: 'WhereLangInput',
        target: 'RenderTarget',
      },
      async resolve(root, args) {
        return formController.renderDescription(root, [args.where.language], args.target)
      },
    })
    t.field('template', {
      type: 'Template',
    })
    t.int('submitLimit')
    t.field('submittability', {
      type: 'FormSubmittability',
      async resolve(root, args, context) {
        return formController.getSubmittability(root.id, context.sourceHash)
      },
    })
  },
})
