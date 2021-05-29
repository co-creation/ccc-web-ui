import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Image,
} from '@chakra-ui/react'

function BookingCard( props ) {
  const {
    date,
    title,
    imageUrl,
    // price,
  } = props

  return (
    <Box
      maxW="344px"
      borderWidth="2px"
      borderColor="base.200"
      borderRadius="lg"
      bg="white"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={imageUrl}
        maxW="100%"
        h="192px"
        borderTopRadius="lg"
        objectFit="cover"
      />
      <Box
        padding="16px"
        display="flex"
        flexGrow="1"
        flexDirection="column"
        alignContent="flex-end"
      >
        <Text textStyle="bodyBold" color="base.800" paddingBottom="8px">{date}</Text>
        <Text textStyle="h3" color="base.800" paddingBottom="8px">{title}</Text>
      </Box>
    </Box>
  )
}

export default BookingCard

BookingCard.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  // price: PropTypes.number,
}

BookingCard.defaultProps = {
  date: 'Booking Date',
  title: 'Booking Title',
  imageUrl: 'https://bit.ly/sage-adebayo',
  // price: 0.0,
}
