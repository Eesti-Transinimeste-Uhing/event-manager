import VError from 'verror'

export abstract class UserFacingError extends VError {
  private _message: string

  constructor(error: Error | null, message: string) {
    if (error) {
      super(error, message)
    } else {
      super(message)
    }

    this._message = message
  }

  override get message() {
    return this._message
  }
}
