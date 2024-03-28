import * as Pino from 'pino'
import path from 'node:path'
import fs from 'node:fs'

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

export const getNumber = (name: string, input?: string | null): number => {
  const checkedInput = getString(name, input)
  const parsed = Number.parseFloat(checkedInput)

  if (Number.isNaN(parsed)) {
    throw new ConfigurationError(`${name} must be a number, got "${checkedInput}"`)
  }

  return parsed
}

export const getAbsolutePath = (name: string, input?: string | null): string => {
  const userPath = getString(name, input)

  if (!path.isAbsolute(userPath)) {
    throw new ConfigurationError(`Value for "${name}" must be an absolute path. Got "${userPath}"`)
  }

  return userPath
}

export const getWritablePath = (name: string, input?: string | null): string => {
  const fullPath = path.resolve(getAbsolutePath(name, input))

  try {
    fs.accessSync(fullPath, fs.constants.R_OK | fs.constants.W_OK)
  } catch (error) {
    if (error instanceof Error) {
      throw new ConfigurationError(error, `Value for "${name}" must point to a writable location`)
    } else {
      throw new ConfigurationError(`Value for "${name}" must point to a writable location`)
    }
  }

  return fullPath
}
