import * as crypto from 'node:crypto'

export const hash = (input: string): string => {
  return crypto.createHash('sha256').update(input).digest('hex')
}
