export const toAddressTextFromIndex = (index: number): string => {
  const row = Math.floor(index / 8)
  const column = index % 8
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"][row]
  return [alphabet, column + 1].join("")
}
