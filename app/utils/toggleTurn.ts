import { Turn } from "../types/turn"

export const toggleTurn = (turn: Turn) => {
  return turn === 0 ? 1 : 0
}
