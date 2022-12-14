import { Cell } from "../types/cell"
import { CellAddress } from "../types/cellAddress"
import { Turn } from "../types/turn"
import { createAddresses } from "./createAddresses"
import { createDirections } from "./createDirections"
import { findNextIndexFromCells } from "./findNextIndexFromCells"
import { toCellsFromAddresses } from "./toCellsFromAddresses"
import { toIndexFromAddress } from "./toIndexFromAddress"
import { toLineAddresses } from "./toLineAddresses"

export const createNextCellAddresses = (cells: Cell[], turn: Turn) => {
  const nextCoordinates = createAddresses().filter((address) => {
    const index = toIndexFromAddress(address)
    return cells[index] === turn
  })

  const items = nextCoordinates.flatMap((address) => {
    const results = createDirections().map((direction) => {
      const [x, y] = direction
      const searchAddresses = toLineAddresses([address], x, y)
      const searchCells = toCellsFromAddresses(cells, searchAddresses)
      const index = findNextIndexFromCells(searchCells, turn)
      if (index < 1) {
        return null
      }
      return searchAddresses[index] ?? null
    })
    return results.filter((f): f is NonNullable<typeof f> => {
      return f !== null
    })
  })

  const ts = items.map((address) => address.join("-"))

  return Array.from(new Set(ts)).map((item) => {
    return item.split("-").map((text) => parseInt(text)) as CellAddress
  })
}
