import VError from 'verror'

export class ConfigurationError extends VError {
  public override name = 'ConfigurationError'
}
