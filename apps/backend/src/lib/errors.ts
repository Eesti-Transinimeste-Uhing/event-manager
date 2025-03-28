import { UserFacingError } from './user-facing-error'

export class UnauthorisedError extends UserFacingError {
  constructor() {
    super(null, 'Unauthorised')
  }

  override name = 'UnauthorisedError'
}

export class FormAlreadySubmittedError extends UserFacingError {
  override name = 'FormAlreadySubmittedError'
}

export class EntityNotFoundError extends UserFacingError {
  override name = 'EntityNotFoundError'
}

export class EntityFetchingError extends UserFacingError {
  override name = 'EntityFetchingError'
}

export class FormSubmissionLimitExceededError extends UserFacingError {
  override name = 'FormSubmissionLimitExceededError'
}

export class EntityConstructionError extends UserFacingError {
  override name = 'EntityConstructionError'
}
