import { UserFacingError } from '../user-facing-error'

export class FormAlreadySubmittedError extends UserFacingError {
  override name = 'FormAlreadySubmittedError'
}
