import { Grid, Stack, Text } from "@chakra-ui/react"
import produce from "immer"
import type { NextPage } from "next"
import { useState } from "react"
import { ButtonCell } from "../app/components/ButtonCell"
import { Turn } from "../app/types/turn"
import { createCells } from "../app/utils/createCells"
import { createNextCellAddresses } from "../app/utils/createNextCellAddresses"
import { toFlipIndexGroup } from "../app/utils/toFlipIndexGroup"
import { toIndexFromAddress } from "../app/utils/toIndexFromAddress"
import { toggleTurn } from "../app/utils/toggleTurn"

const PageHome: NextPage = () => {
  const [turn, setTurn] = useState<Turn>(0)

  const [cells, setCells] = useState(() => {
    return createCells()
  })

  const nextCellAddresses = createNextCellAddresses(cells, turn)

  const nextIndexes = nextCellAddresses.map(toIndexFromAddress)

  const onClick = (index: number) => {
    const flipIndexGroups = toFlipIndexGroup(cells, turn, index)
    const nextState = produce(cells, (draftState) => {
      for (const indexes of flipIndexGroups) {
        for (const index of indexes) {
          draftState[index] = turn
        }
      }
    })
    const nextCellAddresses = createNextCellAddresses(
      nextState,
      toggleTurn(turn),
    )
    setCells(nextState)
    if (0 < nextCellAddresses.length) {
      setTurn(toggleTurn(turn))
    }
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
