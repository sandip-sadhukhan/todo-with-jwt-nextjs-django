import { Center, Spinner } from "@chakra-ui/react"
import React from "react"

const Loader = () => {
  return (
    <Center w="full" h="100vh">
      <Spinner size="xl" />
    </Center>
  )
}

export default Loader
