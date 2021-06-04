import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {
  Button,
  HStack,
  Container,
  Flex,
} from '@chakra-ui/react'

import { useAirtable } from '../airtable/AirtableApp'

import {
  Layout,
  TextCard,
  LinkButton,
  ConfirmationAlertDialog,
} from '../components'

export default function BookingScreen() {
  const {
    user,
    getUser,
    bookings,
    getBookings,
    deleteBooking,
  } = useAirtable()

  const paymentRate = user?.['Payment Rate']?.[0]
  const [outstandingBooking, setOutstandingBooking] = useState( null )

  useEffect( () => {
    if ( paymentRate ) {
      // exit, don't periodically refresh user for an update since
      // we already have their payment rate
      return null
    }
    const intervalRef = setInterval( getUser, 1000 * 1.5 )
    return () => clearInterval( intervalRef )
  }, [getUser, paymentRate, getBookings, outstandingBooking] )

  useEffect( () => {
    const oustandingBooking = Object
      .values( bookings )
      .find( ( foundBooking ) => !foundBooking?.['Payment ID'] )
    if ( oustandingBooking ) {
      // TODO make sure this doesn't incorrectly fire when the user has
      // simply moved on to pay for a new booking in the same session
      // and it is def outstanding but not 'orphaned' ...
      console.log( `Outstanding booking found: ${oustandingBooking?.['Booking ID']}` )
      setOutstandingBooking( oustandingBooking )
    } else {
      setOutstandingBooking( null )
    }
  }, [bookings] )

  const deleteOustandingBooking = async () => {
    await deleteBooking( outstandingBooking?.recordId )
  }

  return (
    <Layout>
      <Container maxW="container.lg">
        <Flex justify="center">
          <Header
            paymentRate={paymentRate}
            hasOutstandingBooking={!!outstandingBooking}
            deleteOustandingBooking={deleteOustandingBooking}
          />
        </Flex>
        <AirtableViews
          paymentRate={paymentRate}
          hasOutstandingBooking={!!outstandingBooking}
        />
      </Container>
    </Layout>
  )
}

/**
 * Screen Helper Elements
 */

function Header( props ) {
  const {
    paymentRate,
    hasOutstandingBooking,
    deleteOustandingBooking,
  } = props

  if ( paymentRate && !hasOutstandingBooking ) {
    return (
      <TextCard
        title="Your Payment Rate:"
        body={`${paymentRate} Rate`}
      />
    )
  }

  if ( hasOutstandingBooking ) {
    return (
      <>
        <TextCard
          title="Pick up where you left off?"
          body="It looks like you already have a booking that you haven't paid for yet. To finalize your booking, click 'Complete Booking'. If you want to change your booking, click 'Start Over'. Incomplete bookings are cleared from the system periodically."
        />
        <HStack mt="4">
          <Button
            colorScheme="danger"
            borderRadius="full"
            py="4"
            px="10"
            lineHeight="1"
            size="md"
            color="base.900"
            onClick={deleteOustandingBooking}
          >
            Start Over
          </Button>
          <LinkButton
            to="booking/checkout"
          >
            Complete Booking
          </LinkButton>
        </HStack>
      </>
    )
  }

  return null
}

Header.propTypes = {
  deleteOustandingBooking: PropTypes.func.isRequired,
  paymentRate: PropTypes.string,
  hasOutstandingBooking: PropTypes.bool,
}

Header.defaultProps = {
  paymentRate: null,
  hasOutstandingBooking: false,
}

function AirtableViews( props ) {
  const { hasOutstandingBooking, paymentRate } = props

  const history = useHistory()

  if ( !paymentRate ) {
    return (
      <iframe
        title="Background Questionnaire"
        className="airtable-embed airtable-dynamic-height"
        src="https://airtable.com/embed/shrTwwtGKzzw6v602?backgroundColor=greenLight"
        frameBorder="0"
        width="100%"
        height="900"
      />
    )
  }

  if ( hasOutstandingBooking ) {
    return null
  }

  return (
    <Flex direction="column" justify="center">
      <iframe
        title="Available Bed Spots"
        className="airtable-embed"
        src="https://airtable.com/embed/shrufAIqyvSDeVRZX?backgroundColor=greenLight&viewControls=on"
        frameBorder="0"
        width="100%"
        height="533"
        style={{
          background: 'transparent',
          border: '1px solid #ccc',
          borderRadius: 4,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
          marginBottom: '16px',
        }}
      />
      <iframe
        title="Booking Form"
        className="airtable-embed"
        src="https://airtable.com/embed/shrNMNH2cqimeNOaa?backgroundColor=greenLight"
        frameBorder="0"
        width="100%"
        height="750"
        style={{
          background: 'transparent',
          border: '1px solid #ccc',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
          borderRadius: 4,
        }}
      />
      <Flex justify="center">
        <ConfirmationAlertDialog
          onConfirm={() => history.push( '/booking/checkout' )}
          headerText="Did you Submit your Booking Request?"
          bodyText="This app is a work in progress, and we're just making sure you clicked 'Submit' on the Booking form before continuing. If you did, no worries — please continue! If not, please finish your booking request before proceeding to the Payment screen."
          cancelText="Submit First"
          actionText="Continue to Payment"
          triggerText="Continue to Payment"
        />
      </Flex>
    </Flex>
  )
}

AirtableViews.propTypes = {
  paymentRate: PropTypes.string,
  hasOutstandingBooking: PropTypes.bool,
}

AirtableViews.defaultProps = {
  paymentRate: null,
  hasOutstandingBooking: false,
}
