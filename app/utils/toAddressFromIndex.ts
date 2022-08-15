import { CellAddress } from "../types/cellAddress"

export const toAddressFromIndex = (index: number): CellAddress => {
  const row = Math.floor(index / 8)
  const column = index % 8
  return [row, column]
}
