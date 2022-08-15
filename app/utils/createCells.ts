export const createCells = () => {
  const indexes = Array(8 * 8).fill(null)
  return indexes.map((_, index) => {
    if (index === 27 || index === 36) {
      return 0
    }
    if (index === 28 || index === 35) {
      return 1
    }
    return null
  })
}
