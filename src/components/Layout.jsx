import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'

import Header from './Header'

export default function Layout( props ) {
  const {
    children,
    ...rest
  } = props

  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: '1200px' }}
      m="0 auto"
      {...rest}
    >
      <Header />
      {children}
    </Flex>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType( [
    PropTypes.node,
    PropTypes.arrayOf( PropTypes.node ),
  ] ),
}

Layout.defaultProps = {
  children: [],
}
