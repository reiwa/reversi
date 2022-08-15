import { CellAddress } from "../types/cellAddress"

export const createAddresses = () => {
  return Array(8 * 8)
    .fill(null)
    .map((_, index): CellAddress => {
      const row = Math.floor(index / 8)
      const column = index % 8
      return [row, column]
    })
}
