import VError from 'verror'

export abstract class UserFacingError extends VError {
  private _message: string

  constructor(error: Error, message: string) {
    super(error, message)

    this._message = message
  }

  override get message() {
    return this._message
  }
}
