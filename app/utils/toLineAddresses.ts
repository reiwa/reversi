import { CellAddress } from "../types/cellAddress"

export const toLineAddresses = (
  addresses: CellAddress[],
  x: number,
  y: number,
): CellAddress[] => {
  const lastAddress = addresses[addresses.length - 1]
  const [row, column] = lastAddress
  const nextRow = row + x
  const nextColumn = column + y
  if (nextRow < 0 || 7 < nextRow || nextColumn < 0 || 7 < nextColumn) {
    return addresses
  }
  const nextAddress: CellAddress = [nextRow, nextColumn]
  return toLineAddresses([...addresses, nextAddress], x, y)
}
