import VError from 'verror'

export class EntityNotFoundError extends VError {
  override name = 'EntityNotFoundError'
}
