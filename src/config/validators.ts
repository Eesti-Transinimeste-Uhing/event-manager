import * as Pino from 'pino'

import { ConfigurationError } from './errors'

const validLevels: Pino.Level[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']

const isLevel = (input: string): input is Pino.Level => {
  return validLevels.includes(input as Pino.Level)
}

export const getString = (name: string, input?: string | null): string => {
  if (!input) {
    throw new ConfigurationError(`${name} must be defined`)
  }

  return input
}

export const getLevel = (name: string, input?: string | null): Pino.Level => {
  const checkedInput = getString(name, input)

  if (!isLevel(checkedInput)) {
    throw new ConfigurationError(`${input} is not one of ${validLevels.join(',')}`)
  }

  return checkedInput
}
