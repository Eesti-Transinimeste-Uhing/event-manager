import {
  Form,
  FormSubmission,
  FormSubmissionResult,
  UnimplementedFormsService,
  GetFormParams,
} from '@etu/events-proto/dist/backend/forms'
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'

import { formController } from '../../../server/static-context'
import { EntityNotFoundError } from '../../../lib/errors'
import { wrapError } from '../../../lib/error-wrapping'

export class FormsService extends UnimplementedFormsService {
  override async getForm(
    call: ServerUnaryCall<GetFormParams, Form>,
    callback: sendUnaryData<Form>
  ): Promise<void> {
    try {
      const form = await formController.getById(call.request.id)

      if (!form) {
        return callback(new EntityNotFoundError(null, `Form "${call.request.id}" not found`), null)
      }

      const template = await form.template

      const result = Form.fromObject({
        id: form.id,
        name: form.name[call.request.language],
        banner: form.bannerUrl,
        description: JSON.stringify(template.description),
        template: {
          id: template.id,
          fields: template.fields,
        },
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
