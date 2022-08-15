import { Cell } from "../types/cell"

export const findFlipIndexFromCells = (cells: Cell[], turn: 0 | 1) => {
  const regExp = turn === 0 ? /x[1]+0/ : /x[0]+1/
  const texts = cells.map((cell) => {
    return cell === null ? "x" : cell
  })
  const text = texts.join("")
  const result = text.match(regExp)
  if (result === null) {
    return -1
  }
  return result[0].length - 1
}
