import { Cell } from "../types/cell"
import { CellAddress } from "../types/cellAddress"

export const toCellsFromAddresses = (
  cells: Cell[],
  addresses: CellAddress[],
): Cell[] => {
  return addresses.map((address) => {
    const [row, column] = address
    return cells[row * 8 + column]
  })
}
