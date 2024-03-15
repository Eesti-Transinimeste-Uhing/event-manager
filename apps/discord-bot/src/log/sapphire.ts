import { ILogger, LogLevel } from '@sapphire/framework'
import * as Pino from 'pino'

export class PinoLogger implements ILogger {
  constructor(private log: Pino.Logger) {}

  public trace = (input: string) => this.log.trace(input)
  public debug = (input: string) => this.log.debug(input)
  public info = (input: string) => this.log.info(input)
  public warn = (input: string) => this.log.warn(input)
  public error = (input: string) => this.log.error(input)
  public fatal = (input: string) => this.log.fatal(input)

  public static pinoToSapphireLevel = (input: Pino.Level): LogLevel => {
    switch (input) {
      case 'trace':
        return LogLevel.Trace

      case 'debug':
        return LogLevel.Debug

      case 'info':
        return LogLevel.Info

      case 'warn':
        return LogLevel.Warn

      case 'error':
        return LogLevel.Error

      case 'fatal':
        return LogLevel.Fatal

      default:
        return LogLevel.Debug
    }
  }

  public static sapphireToPinoLevel = (input: LogLevel): Pino.Level => {
    switch (input) {
      case LogLevel.Trace:
        return 'trace'

      case LogLevel.Debug:
        return 'debug'

      case LogLevel.Info:
        return 'info'

      case LogLevel.Warn:
        return 'warn'

      case LogLevel.Error:
        return 'error'

      case LogLevel.Fatal:
        return 'fatal'

      default:
        return 'debug'
    }
  }

  public has(): boolean {
    return true
  }

  public write = (level: LogLevel, input: string) => {
    const pinoLevel = PinoLogger.sapphireToPinoLevel(level)

    this.log[pinoLevel](input)
  }
}
