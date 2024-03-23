function splitAt(str: string, index: number) {
  return index < 1 ? [str, ''] : [str.substring(0, index), str.substring(index)]
}

const MAX_LENGTH = 1024

export function trimErrorMessage(errorMessage: string) {
  const newLineIndex = errorMessage.indexOf('\n')
  const splitIndex =
    newLineIndex === -1 ? MAX_LENGTH : Math.min(newLineIndex, MAX_LENGTH)
  const [first, rest] = splitAt(errorMessage, splitIndex)

  return first + (rest ? `… (+${rest.length})` : '')
}
