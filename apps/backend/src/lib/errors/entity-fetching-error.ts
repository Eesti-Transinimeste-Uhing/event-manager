import { UserFacingError } from '../user-facing-error'

export class EntityFetchingError extends UserFacingError {
  override name = 'EntityFetchingError'
}
