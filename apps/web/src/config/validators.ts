export const getString = (name: string, input?: string | null): string => {
  if (!input) {
    throw new Error(`${name} must be defined`)
  }

  return input
}

export const getNumber = (name: string, input?: string | null): number => {
  const checkedInput = getString(name, input)
  const parsed = Number.parseFloat(checkedInput)

  if (Number.isNaN(parsed)) {
    throw new Error(`${name} must be a number, got "${checkedInput}"`)
  }

  return parsed
}
