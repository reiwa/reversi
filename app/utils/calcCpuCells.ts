import produce from "immer"
import { Cell } from "../types/cell"
import { createNextCellAddresses } from "./createNextCellAddresses"
import { toFlipCellIndexes } from "./toFlipCellIndexes"
import { toIndexFromAddress } from "./toIndexFromAddress"

export const calcCpuCells = async (cells: Cell[], turn: 0 | 1) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const addresses = createNextCellAddresses(cells, turn)
  const nextIndexes = addresses.map(toIndexFromAddress)
  const length = nextIndexes.length
  const nextIndex = nextIndexes[Math.floor(Math.random() * length)]
  const flipIndexes = toFlipCellIndexes(cells, turn, nextIndex)
  return produce(cells, (draftState) => {
    for (const index of flipIndexes) {
      draftState[index] = turn
    }
  })
}
