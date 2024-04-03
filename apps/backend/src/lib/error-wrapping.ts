import { QueryFailedError, EntityNotFoundError as TypeormEntityNotFoundError } from 'typeorm'
import VError from 'verror'

import { FormAlreadySubmittedError } from './errors/form-already-submitted'
import { EntityFetchingError } from './errors/entity-fetching-error'
import { EntityNotFoundError } from './errors/entity-not-found'

const appErrors = [FormAlreadySubmittedError, EntityFetchingError, EntityNotFoundError]

export const wrapError = (error: unknown) => {
  for (const errorType of appErrors) {
    if (error instanceof errorType) {
      return error
    }
  }

  if (error instanceof QueryFailedError) {
    if (error.driverError.constraint === 'UQ_DUPLICATE_SUBMISSION') {
      return new FormAlreadySubmittedError(error, 'Form already submitted')
    }
  }

  if (error instanceof TypeormEntityNotFoundError) {
    return new EntityNotFoundError(error, 'Not found')
  }

  if (error instanceof Error) {
    return new VError(error, 'Unknown error')
  }

  return new VError(`Unknown value thrown: "${String(error)}"`)
}
