import { Cell } from "../types/cell"
import { Turn } from "../types/turn"
import { createDirections } from "./createDirections"
import { findFlipIndexFromCells } from "./findFlipIndexFromCells"
import { toAddressFromIndex } from "./toAddressFromIndex"
import { toCellsFromAddresses } from "./toCellsFromAddresses"
import { toIndexFromAddress } from "./toIndexFromAddress"
import { toLineAddresses } from "./toLineAddresses"

export const toFlipCellIndexes = (cells: Cell[], turn: Turn, index: number) => {
  const address = toAddressFromIndex(index)

  const addressGroups = createDirections().map((direction) => {
    const [x, y] = direction
    const searchAddresses = toLineAddresses([address], x, y)
    const searchCells = toCellsFromAddresses(cells, searchAddresses)
    const index = findFlipIndexFromCells(searchCells, turn)
    if (0 < index) {
      return searchAddresses.slice(0, index)
    }
    return []
  })

  return addressGroups.flatMap((addresses) => {
    return addresses.map((address) => {
      return toIndexFromAddress(address)
    })
  })
}
