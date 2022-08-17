import { Grid, Stack, Text } from "@chakra-ui/react"
import produce from "immer"
import type { NextPage } from "next"
import { useState } from "react"
import { ButtonCell } from "../app/components/ButtonCell"
import { Cell } from "../app/types/cell"
import { Turn } from "../app/types/turn"
import { calcCpuCells } from "../app/utils/calcCpuCells"
import { createCells } from "../app/utils/createCells"
import { createNextCellAddresses } from "../app/utils/createNextCellAddresses"
import { toFlipCellIndexes } from "../app/utils/toFlipCellIndexes"
import { toIndexFromAddress } from "../app/utils/toIndexFromAddress"

const PageHome: NextPage = () => {
  const [isResult, setResult] = useState(false)

  const [cpuTurn, setCpuTurn] = useState<Turn>(1)

  const [turn, setTurn] = useState<Turn>(0)

  const isTurnCpu = turn === cpuTurn

  const [cells, setCells] = useState(() => {
    return createCells()
  })

  const nextCellAddresses = createNextCellAddresses(cells, turn)

  const nextIndexes = nextCellAddresses.map(toIndexFromAddress)

  const onCheck = async (cells: Cell[], turn: Turn, cpuTurn: Turn) => {
    const nextTurn = turn === 0 ? 1 : 0
    const addresses = createNextCellAddresses(cells, turn)
    const nextAddresses = createNextCellAddresses(cells, nextTurn)
    if (addresses.length === 0 && nextAddresses.length === 0) {
      setResult(true)
      return
    }
    const isTurnCpu = turn === cpuTurn
    const isTurnPlayer = turn !== cpuTurn
    if (isTurnPlayer && nextAddresses.length === 0) {
      return
    }
    if (isTurnPlayer && nextAddresses.length !== 0) {
      setTurn((state) => (state === 0 ? 1 : 0))
      const nextCells = await calcCpuCells(cells, cpuTurn)
      setCells(nextCells)
      setTurn((state) => (state === 0 ? 1 : 0))
      onCheck(nextCells, nextTurn, cpuTurn)
      return
    }
    if (isTurnCpu && nextAddresses.length === 0) {
      setTurn((state) => (state === 0 ? 1 : 0))
      const nextCells = await calcCpuCells(cells, cpuTurn)
      setCells(nextCells)
      setTurn((state) => (state === 0 ? 1 : 0))
      onCheck(nextCells, nextTurn, cpuTurn)
      return
    }
    if (isTurnCpu && nextAddresses.length !== 0) {
      setTurn(nextTurn)
      return
    }
  }

  const onClick = (index: number) => {
    const flipIndexes = toFlipCellIndexes(cells, turn, index)
    const nextCells = produce(cells, (state) => {
      for (const index of flipIndexes) {
        state[index] = turn
      }
    })
    setCells(nextCells)
    onCheck(nextCells, turn, cpuTurn)
  }

  return (
    <Stack spacing={4} py={4}>
      <Stack>
        <Text
          textAlign={"center"}
          color={turn ? "blue.600" : "red.600"}
          fontWeight={"bold"}
        >
          {turn ? "青の番" : "赤の番"}
        </Text>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"}>
        <Grid templateColumns="repeat(8, 1fr)" gap={2} w={"fit-content"}>
          {cells.map((cell, index) => (
            <Stack key={index}>
              <ButtonCell
                index={index}
                color={cell}
                turn={turn}
                isDisabled={isTurnCpu}
                isActive={nextIndexes.includes(index)}
                onClick={() => {
                  onClick(index)
                }}
              />
            </Stack>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default PageHome
