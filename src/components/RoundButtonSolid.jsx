import React from 'react'
import { Button } from '@chakra-ui/react'

/**
 * @function RoundButtonFull
 * @component 
 * @param {Object} props 
 * @returns 
 */
export default function RoundButtonSolid( props ) {
  
  const { to, children, ...rest } = props
  
  return (
    <Button
      colorScheme="primary"
      borderRadius="full"
      py="4"
      px="4"
      lineHeight="1"
      size="md"
      textColor='black'
      {...rest}
    >
      {children}
    </Button>
  )
}