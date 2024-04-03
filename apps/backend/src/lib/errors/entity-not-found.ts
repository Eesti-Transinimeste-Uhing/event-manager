import { UserFacingError } from '../user-facing-error'

export class EntityNotFoundError extends UserFacingError {
  override name = 'EntityNotFoundError'
}
