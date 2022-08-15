import { CellAddress } from "../types/cellAddress"

export const toIndexFromAddress = (address: CellAddress) => {
  const [row, column] = address
  return row * 8 + column
}
