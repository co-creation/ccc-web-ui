import React from 'react'
import { Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'

/**
 * @function RoundButtonFull
 * @component
 * @param {Object} props
 * @returns
 */
export default function RoundButtonSolid( props ) {
  const { children, ...rest } = props

  return (
    <Button
      colorScheme="primary"
      borderRadius="full"
      py="4"
      px="4"
      lineHeight="1"
      size="md"
      textColor="black"
      {...rest}
    >
      {children}
    </Button>
  )
}

RoundButtonSolid.propTypes = {
  children: PropTypes.oneOfType( [
    PropTypes.node,
    PropTypes.arrayOf( PropTypes.node ),
  ] ),
}

RoundButtonSolid.defaultProps = {
  children: [],
}
