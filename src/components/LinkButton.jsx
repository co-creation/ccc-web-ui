import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

/**
 * @function LinkButton Wraps the Chakra UI button in a React Router link
 * for internal routing convenience
 * @component
 * @param {Object} props
 * @returns
 */
export default function LinkButton( props ) {
  const { to, children, ...rest } = props

  return (
    <Link to={to}>
      <Button
        colorScheme="primary"
        borderRadius="full"
        py="4"
        px="4"
        lineHeight="1"
        size="md"
        {...rest}
      >
        {children}
      </Button>
    </Link>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType( [
    PropTypes.node,
    PropTypes.arrayOf( PropTypes.node ),
  ] ),
}

LinkButton.defaultProps = {
  children: [],
}
