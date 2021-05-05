import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { 
  Button, 
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SkeletonText,
  Box,
  Flex,
} from '@chakra-ui/react'


import { useAirtable } from '../airtable/AirtableApp'
import { useRealmApp } from '../RealmApp'

import Layout from '../components/Layout'

import Config from '../Config'

const stripePromise = loadStripe( Config.STRIPE_API_KEY )

export default function CheckoutScreen() {

  const history = useHistory()
  const toast = useToast()
  const realmApp = useRealmApp()
  const { 
    user, 
    userBookings,
    refreshUserBookings, 
  } = useAirtable()

  
  const realmUsername = realmApp?.currentUser?._profile?.data?.email
  const airtableUsername = user?.Email
  const paymentRate = user?.[ 'Payment Rate' ]?.[0]
  const unpaidBooking = userBookings?.find( booking => !booking?.fields?.[ 'Payment ID'] )
  const roomCost = unpaidBooking?.fields?.[ 'Calculated Room (Bed) Cost' ] ?? 0
  const mealPlanCost = unpaidBooking?.fields?.[ 'Calculated Board (Food) Cost' ] ?? 0
  const bevPlanCost = unpaidBooking?.fields?.[ 'Calculated Beverage Cost' ] ?? 0
  const totalCost = unpaidBooking?.fields?.[ 'Total Booking Amount' ] ?? 0
  const totalBookedDates = unpaidBooking?.fields?.[ 'Total Booked Dates' ] ?? 0
  
  useEffect( () => { 
    if ( !unpaidBooking ) {
      refreshUserBookings()
    }
  }, [ refreshUserBookings, unpaidBooking ] )
  
  // Validate the potential checkout session user
  useEffect( () => { 
    if ( user && realmUsername !== airtableUsername ) {
      // There's been an operational error. These two usernames must match. 
      toast( {
        title: "User Account Error",
        description: `It looks like your Airtable username "${airtableUsername}" and your CCC Cloud username "${realmUsername}" have diverged, but they need to match to move forward with payments. Please contact michael.wedd@gmail.com and we'll sort it out ASAP!`,
        status: "error",
        duration: 18000,
        isClosable: true,
      } )
    }
  }, [ user, toast, realmUsername, airtableUsername ] )

  const onStartCheckout = async ( event ) => {

    toast( {
      title: "Hang tight while we redirect you securely to Stripe Checkout...",
      description: 'We use Stripe Checkout to process payments with world-class security and encryption.',
      status: "info",
      duration: 9000,
      isClosable: true,
    } )

    try {
      const stripe = await stripePromise
      // Call your backend to create the Checkout Session
      const { data : checkoutSession } = await axios( {
        method: 'post',
        url: `${Config.STRIPE_SERVER_URL}/user/${airtableUsername}/booking/${unpaidBooking?.id}/create-checkout-session`,
        data: {
          roomCost,
          mealPlanCost,
          bevPlanCost,
        }
      } )
  
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout( {
        sessionId: checkoutSession.id,
      } )
      
      if ( result.error ) {
        throw result.error 
      }
      
    } catch ( error ) {
      toast( {
        title: "Unable to Start CCC Checkout",
        description: `We encountered this error: ${error.message}. Please try again. Contact Mike Wedd (michael.wedd@gmail.com) if this error continues to block you from finalizing your booking.`,
        status: "error",
        duration: 18000,
        isClosable: true,
      } )
    }

  }

  const bookingDurationText = `${totalBookedDates} Day${totalBookedDates > 1 ? 'S' : ''}`

  return (
    <Layout>
      <Box minWidth="525px" padding="6" boxShadow="lg" borderRadius={8} bg="white">
      { !unpaidBooking ? ( 
        <SkeletonText mt="4" noOfLines={10} spacing="8" />
      ) : ( 
       <Flex direction="column" justify="center" align="center">
        <Table colorScheme="base" size="lg">
          <TableCaption placement="top" fontWeight="bold">
            CCC Booking Summary
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Service</Th>
              <Th>Quantity</Th>
              <Th isNumeric>Cost</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roomCost > 0 && ( 
              <Tr>
                <Td>Room</Td>
                <Td>{bookingDurationText}</Td>
                <Td isNumeric>{`$${roomCost}`}</Td>
              </Tr>
            )}
            {mealPlanCost > 0 && ( 
              <Tr>
                <Td>Meal Plan</Td>
                <Td>{bookingDurationText}</Td>
                <Td isNumeric>{`$${mealPlanCost}`}</Td>
              </Tr>
            )}
            {bevPlanCost > 0 && ( 
              <Tr>
                <Td>Alcohol Add-On</Td>
                <Td>{bookingDurationText}</Td>
                <Td isNumeric>{`$${bevPlanCost}`}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
          <Stat mt="8">
            <Flex direction="column" justify="center" align="center">
            <StatLabel>Total Cost</StatLabel>
            <StatHelpText>{paymentRate} Rate</StatHelpText>
            <StatNumber>{`$${totalCost}`}</StatNumber>
            </Flex>
          </Stat>
        </Flex> 
      )}
      </Box>
      <Button 
        colorScheme="primary"
        borderRadius="full"
        py="6"
        px="12"
        lineHeight="1"
        size="lg"
        mt="35"
        disabled={!unpaidBooking}
        onClick={onStartCheckout}
        >
        Pay
      </Button>
    </Layout>
  )
}
