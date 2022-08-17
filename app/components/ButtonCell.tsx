import { Button } from "@chakra-ui/react"
import { FC } from "react"
import { toAddressTextFromIndex } from "../utils/toAddressTextFromIndex"

type Props = {
  index: number
  color: 0 | 1 | null
  turn: 0 | 1
  isActive: boolean
  isDisabled: boolean
  onClick(): void
}

export const ButtonCell: FC<Props> = (props) => {
  const colorScheme = () => {
    if (props.color === 0) {
      return "red"
    }
    if (props.color === 1) {
      return "blue"
    }
    return "gray"
  }

  const borderColor = () => {
    if (!props.isActive) {
      return "transparent"
    }
    return props.turn === 0 ? "red.400" : "blue.400"
  }

  const isDisabled =
    props.isDisabled || (props.color === null && !props.isActive)

  const text = toAddressTextFromIndex(props.index)

  return (
    <Button
      borderRadius={"100%"}
      colorScheme={colorScheme()}
      isDisabled={isDisabled}
      borderWidth={1}
      borderColor={borderColor()}
      onClick={props.isActive ? props.onClick : undefined}
      fontSize={8}
      lineHeight={"100%"}
      p={1}
      size={"md"}
    >
      {text}
    </Button>
  )
}
