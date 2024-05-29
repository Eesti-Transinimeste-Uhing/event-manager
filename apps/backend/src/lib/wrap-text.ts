export const wrapText = (length: number, input: string): string[] => {
  const words = input.split(' ')
  const lines: string[] = ['']

  for (const word of words) {
    if (lines[lines.length - 1].length + word.length > length) {
      lines.push('')
    }

    lines[lines.length - 1] += `${word} `
  }

  return lines
}
