import VError from 'verror'

export class EntityFetchingError extends VError {
  override name = 'EntityFetchingError'
}
