import {
  Form,
  FormSubmission,
  FormSubmissionResult,
  ObjectFilter,
  Template,
  UnimplementedFormsService,
} from '@etu/events-proto'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { DateTime } from 'luxon'

import { formController } from '../../../server/static-context'
import urlJoin from '../../../lib/url-join'
import { config } from '../../../config'
import { EntityNotFoundError } from '../../../lib/errors'
import { wrapError } from '../../../lib/error-wrapping'

export class FormsService extends UnimplementedFormsService {
  override async getForm(
    call: ServerUnaryCall<ObjectFilter, Form>,
    callback: sendUnaryData<Form>
  ): Promise<void> {
    try {
      const form = await formController.getById(call.request.id)

      if (!form) {
        return callback(new EntityNotFoundError(null, `Form "${call.request.id}" not found`), null)
      }

      const template = await form.template

      const result = new Form({
        id: form.id,
        name: form.name,
        banner: form.bannerUrl,
        description: JSON.stringify(template.description),
        template: new Template({
          id: template.id,
          fields: template.fields,
        }),
      })

      callback(null, result)
    } catch (error) {
      if (error instanceof Error) {
        callback(wrapError(error), null)
      }
    }
  }

  override async submitForm(
    call: ServerUnaryCall<FormSubmission, FormSubmissionResult>,
    callback: sendUnaryData<FormSubmissionResult>
  ): Promise<void> {
    try {
      await formController.submit(
        call.request.where.id,
        call.request.sourceHash,
        call.request.data.map((item) => ({
          name: item.name,
          value: item.value,
        }))
      )

      callback(
        null,
        new FormSubmissionResult({
          accepted: true,
        })
      )
    } catch (error) {
      if (error instanceof Error) {
        callback(wrapError(error), null)
      }
    }
  }
}
