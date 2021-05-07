import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

import { useAirtable } from '../airtable/AirtableApp'
import Hero from '../components/Hero'
import Layout from '../components/Layout'

import imageSrc from "../assets/images/heroimage.jpeg"

export default function HomeScreen() {

  const history = useHistory()
  const toast = useToast()
  const [ successNotified, setSuccessNotified ] = useState( false )
  const { user : airtableUser, refreshUserBookings } = useAirtable()
  const firstName = airtableUser?.['First Name']

  useEffect( () => {
      const { search } = history.location 
      if ( search === '?success=true' && !successNotified && firstName ) {
        // Stripe checkout just redirected back after a successful payment
        toast( {
          title: `You're booked, ${firstName}!`,
          description: 'Check your email for a booking summary and your receipt',
          status: 'success',
          duration: 9000,
          isClosable: true,
        } )
        setSuccessNotified( true )
        refreshUserBookings()
      }
    }, [ history, firstName, toast, successNotified, refreshUserBookings ] ) 

  const welcomeText = firstName ? `Welcome Home, ${firstName}` : 'Welcome Home'

  return (
    <Layout>
      <Hero
        title={welcomeText}
        subtitle="Activate Your Dreams Consciously, Creatively, and Collectively"
        image={imageSrc}
        ctaText="Book Your Spot"
        ctaLink="/booking"
      />
    </Layout>
  )
}
