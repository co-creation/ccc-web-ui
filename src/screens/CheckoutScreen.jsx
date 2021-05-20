import React, { useEffect, useState } from 'react'
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
  Text,
  SkeletonText,
  Box,
  Flex,
  Link,
  VStack,
} from '@chakra-ui/react'

import { useAirtable } from '../airtable/AirtableApp'
import { useRealmApp } from '../RealmApp'

import Layout from '../components/Layout'
import TextCard from '../components/TextCard'
import Config from '../Config'

const stripePromise = loadStripe( Config.STRIPE_API_KEY )

export default function CheckoutScreen() {
  const [cancellationNotified, setCancellationNotified] = useState( false )
  const history = useHistory()
  const toast = useToast()
  const realmApp = useRealmApp()

  const {
    user,
    getUser,
    bookings,
    getBookings,
  } = useAirtable()

  useEffect( () => {
    getUser()
    getBookings()
  }, [getUser, getBookings] )

  // eslint-disable-next-line no-underscore-dangle
  const realmUsername = realmApp?.currentUser?._profile?.data?.email
  const airtableUsername = user?.Email
  const paymentRate = user?.['Payment Rate']?.[0]

  const unpaidBooking = Object
    .values( bookings )
    .find( ( booking ) => !booking?.['Payment ID'] )

  const roomCost = unpaidBooking?.['Calculated Room (Bed) Cost'] ?? 0
  const mealPlanCost = unpaidBooking?.['Calculated Board (Food) Cost'] ?? 0
  const surcharge = unpaidBooking?.['Calculated Surcharge'] ?? 0
  const bevPlanCost = unpaidBooking?.['Calculated Beverage Cost'] ?? 0
  const totalCost = unpaidBooking?.['Total Booking Amount'] ?? '...Loading'
  const totalBookedDates = unpaidBooking?.['Total Booked Dates'] ?? 0

  useEffect( () => {
    const { search } = history.location
    if ( search === '?canceled=true' && !cancellationNotified ) {
      // Stripe checkout just redirected back after a successful payment
      toast( {
        title: 'Not ready to pay for your booking? Let us know if we can help',
        description: 'Reach out for help in the #ccc-help Slack channel if we can help. If you want to start your booking over, just click "booking" in the top menu and then "Start Over".',
        status: 'info',
        duration: 18000,
        isClosable: true,
      } )
      setCancellationNotified( true )
    }
  }, [history, toast, cancellationNotified, getBookings] )

  // Validate the potential checkout session user
  useEffect( () => {
    if ( user?.Email && realmUsername !== airtableUsername ) {
      // There's been an operational error. These two usernames must match.
      toast( {
        title: 'User Account Error',
        description: `It looks like your Airtable username "${airtableUsername}" and your CCC Cloud username "${realmUsername}" have diverged, but they need to match to move forward with payments. Please contact michael.wedd@gmail.com and we'll sort it out ASAP!`,
        status: 'error',
        duration: 18000,
        isClosable: true,
      } )
    }
  }, [user, toast, realmUsername, airtableUsername] )

  const onStartCheckout = async () => {
    toast( {
      title: 'Hang tight while we transfer you securely to Stripe Checkout...',
      description: 'We use Stripe Checkout to process payments with world-class security and encryption.',
      status: 'info',
      duration: 18000,
      isClosable: true,
    } )

    try {
      const stripe = await stripePromise
      // Call your backend to create the Checkout Session
      const { data: checkoutSession } = await axios( {
        method: 'post',
        url: `${Config.STRIPE_SERVER_URL}/user/${airtableUsername}/create-checkout-session`,
        data: {
          roomCost,
          mealPlanCost,
          bevPlanCost,
          surcharge,
        },
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
        title: 'Unable to Start CCC Checkout',
        description: `We encountered this error: ${error.message}. Please try again. Reach out for help in #ccc-help in Slack if this error continues to block you from finalizing your booking.`,
        status: 'error',
        duration: 18000,
        isClosable: true,
      } )
    }
  }

  const bookingDurationText = `${totalBookedDates} Day${totalBookedDates > 1 ? 's' : ''}`

  return (
    <Layout>
      <>
        {paymentRate && (
        <TextCard
          title="Your Payment Rate:"
          body={`${paymentRate} Rate`}
        />
        )}
        <Box minW="350px" padding="6" boxShadow="lg" borderRadius={8} bg="white">
          { !unpaidBooking ? (
            <SkeletonText mt="4" noOfLines={10} spacing="8" />
          ) : (
            <Flex direction="column" justify="center" align="center">
              <Table colorScheme="base" size="md">
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
                  {surcharge > 0 && (
                  <Tr>
                    <Td>Holiday Surcharge</Td>
                    <Td>{surcharge === 100 ? 'Both Holidays' : 'One Holiday'}</Td>
                    <Td isNumeric>{`$${surcharge}`}</Td>
                  </Tr>
                  )}
                </Tbody>
              </Table>
              <Stat mt="8">
                <Flex direction="column" justify="center" align="center">
                  <StatLabel>Total Cost</StatLabel>
                  {/* <StatHelpText>{paymentRate} Rate</StatHelpText> */}
                  <StatNumber>{`$${totalCost}`}</StatNumber>
                </Flex>
              </Stat>
            </Flex>
          )}
        </Box>
      </>
      <Button
        colorScheme="primary"
        borderRadius="full"
        py="6"
        px="16"
        lineHeight="1"
        size="lg"
        mt="35"
        disabled={!unpaidBooking}
        onClick={onStartCheckout}
      >
        Pay
      </Button>
      <VStack mt="10" px="4">
        <Link
          color="blue"
          mt="5"
          mb="5"
          href="https://docs.google.com/document/d/1lRYZsQeFMU7ylI16MA6w7z2jNWSZ5qEwci2FZ55m7_8/edit?usp=sharing"
          isExternal
        >
          By booking, you are agreeing to the CCC cancellation policy
        </Link>
        <Text as="i" mt="10" mb="10" maxW="450px">
          {/* eslint-disable-next-line max-len */}
          We offer Mutual Aid funding based on the stated need in your C(Q)uestionnaire. If this booking price means you would not be able to participate in the CCC, please reach out to Alex Brunson (803-873-8318) and Shadman Uddin (770-940-1771) to inquire about Mutual Aid.
        </Text>
      </VStack>
    </Layout>
  )
}
