import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import type { FC } from "react"

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
