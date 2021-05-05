import React, { useEffect, useState } from 'react'
import { Button, HStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import { useAirtable } from '../airtable/AirtableApp'

import { Layout, TextCard, LinkButton, ConfirmationAlertDialog } from '../components'

export default function BookingScreen() {

  const { 
    user, 
    refreshUserData, 
    userBookings,
    refreshUserBookings, 
  } = useAirtable()

  
  const paymentRate = user?.['Payment Rate']?.[0]
  
  const [ outstandingBooking, setOutstandingBooking ] = useState( null )

  const toast = useToast()

  useEffect( () => { 
    if ( paymentRate ) {
      // exit, don't periodically refresh user for an update since 
      // we already have their payment rate 
      return null 
    }
    const intervalRef = setInterval( refreshUserData, 1000 * 1.5 )
    return () => clearInterval( intervalRef )
  }, [ paymentRate, refreshUserData ] )

  useEffect( () => { 
    const oustandingBooking = userBookings?.find( booking => !booking?.fields?.[ 'Payment ID'] )
    if ( oustandingBooking ) {
      // TODO make sure this doesn't incorrectly fire when the user has 
      // simply moved on to pay for a new booking in the same session 
      // and it is def outstanding but not 'orphaned' ... 
      setOutstandingBooking( oustandingBooking )
    } else {
      setOutstandingBooking( null )
    }
  }, [ userBookings, userBookings?.length, setOutstandingBooking ] )

  const deleteOustandingBooking = async () => {
    await outstandingBooking.destroy()
    toast( {
      title: "Incomplete Booking Deleted",
      description: "You can now start your booking over again. Don't forget to pay at the checkout this time to complete your booking!",
      status: "success",
      duration: 9000,
      isClosable: true,
    } )
    setTimeout( refreshUserBookings, 1000 * 1.5 )
  }

  return (
    <Layout>
      <Header 
        paymentRate={paymentRate} 
        hasOutstandingBooking={!!outstandingBooking}
        deleteOustandingBooking={deleteOustandingBooking}
      />
      <AirtableViews 
        paymentRate={paymentRate}
        hasOutstandingBooking={!!outstandingBooking}
      />
    </Layout>
  )
}

/**
 * Screen Helper Elements
 */

function Header( props ) {

  const { paymentRate, hasOutstandingBooking, deleteOustandingBooking } = props 

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
          body="It looks like you already have a booking that you haven't paid for yet. Incomplete bookings are cleared from the system periodically. Are you ready to pay for your booking?"
        />
        <HStack mt="4">
          <Button 
            colorScheme="danger"
            borderRadius="full"
            py="4"
            px="10"
            lineHeight="1"
            size="md"
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
      >
    </iframe>
    ) 
  }

  if ( hasOutstandingBooking ) {
    return null
  }

  return ( 
    <>
      <iframe 
        title="Available Bed Spots"
        className="airtable-embed"
        src="https://airtable.com/embed/shrufAIqyvSDeVRZX?backgroundColor=greenLight&viewControls=on" 
        frameBorder="0" 
        width="100%" 
        height="533" 
      >
    </iframe>
    <iframe 
      title="Booking Form"
      className="airtable-embed"
      src="https://airtable.com/embed/shrNMNH2cqimeNOaa?backgroundColor=greenLight" 
      frameBorder="0" 
      width="100%" 
      height="750"
      >
      </iframe>
      <ConfirmationAlertDialog
        onConfirm={() => history.push( '/booking/checkout' )} 
        headerText="Did you Submit your Booking Request?" 
        bodyText="This app is a work in progress, and we're just making sure you clicked 'Submit' on the Booking form before continuing. If you did, no worries — please continue! If not, please finish your booking request before proceeding to the Payment screen." 
        cancelText="I Still Need to Submit" 
        actionText="Continue to Payment"
        triggerText="Continue to Payment"   
      />
    </>
  )
}
