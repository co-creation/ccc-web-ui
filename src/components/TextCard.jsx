import React from "react"
import { Box, Text, Heading } from "@chakra-ui/react"

function TextCard( props ) {
  
  const { title, body } = props 

  return (
    <Box 
      maxW="sm" 
      boxShadow="md" 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="wrap" 
      m="10px 0px 10px 0px">
      <Box m="5">
        <Heading m="5" mb="0" as="h4" size="md">
          {title}
        </Heading>
        <Text m="5" mt="2">
          {body}
        </Text>
      </Box>
    </Box>
  )
  
}

export default TextCard