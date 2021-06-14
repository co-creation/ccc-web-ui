import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  useToast,
  Flex,
  Box,
  Text,
  SimpleGrid,
  Center,
} from '@chakra-ui/react'

import { useAirtable } from '../airtable/AirtableApp'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import { BookingCard } from '../components'
import Utils from '../utils'
import imageSrc from '../assets/images/heroimage.jpeg'
import { useChatAuth } from '../chat'

export default function HomeScreen() {
  const history = useHistory()
  const toast = useToast()
  const [successNotified, setSuccessNotified] = useState( false )
  const { user: airtableUser, bookings, getUser } = useAirtable()
  const firstName = airtableUser?.['First Name']
  const { getToken } = useChatAuth()

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
      getUser()
      getToken()
    }
  }, [history, firstName, toast, successNotified, getUser, getToken] )

  const welcomeText = firstName ? `Welcome Home, ${firstName}` : 'Welcome Home'

  return (
    <Box>
      <Layout>
        <Hero
          title={welcomeText}
          subtitle="Activate Your Dreams Consciously, Creatively, and Collectively"
          image={imageSrc}
          ctaText="Book Your Spot"
          ctaLink="/booking"
        />
      </Layout>
      <Flex
        d="column"
        align="center"
        justify="center"
        bg="base.50"
        px={{ md: '132px' }}
        py="72px"
      >
        <Text
          textAlign={{ base: 'center', md: 'left' }}
          my="24px"
          mb="40px"
          textStyle="h2"
        >
          My Bookings
        </Text>
        <SimpleGrid minChildWidth={{ md: '344px' }} spacing="40px">
          {Object.entries( Utils.parseUserBookings( bookings ) ).map(
            ( [date, title] ) => {
              if ( !( date && title ) ) return null
              return (
                <Center px={{ base: '20px', lg: '0px' }}>
                  <BookingCard
                    key={date}
                    date={date}
                    title={title}
                    imageUrl={Utils.imageForBedSpotName( title )}
                  />
                </Center>
              )
            },
          )}
        </SimpleGrid>
      </Flex>
    </Box>
  )
}
