import React, {
  useContext, useState, useEffect, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

import { useRealmApp } from '../RealmApp'
import Config from '../Config'

const AirtableContext = React.createContext()

export const useAirtable = () => {
  const airtable = useContext( AirtableContext )
  if ( !airtable ) {
    throw new Error(
      'You must call useAirtable() inside of a <AirtableProvider />',
    )
  }
  return airtable
}

export const AirtableProvider = ( { children } ) => {
  const [user, setUser] = useState( {} )
  const [bookings, setBookings] = useState( {} )
  const [isLoading, setIsLoading] = useState( false )
  const [error, setError] = useState( '' )
  const toast = useToast()

  const realmApp = useRealmApp()
  // eslint-disable-next-line no-underscore-dangle
  const realmUsername = realmApp?.currentUser?._profile?.data?.email
  const realmAccessToken = realmApp.currentUser?.accessToken

  const getUser = useCallback(
    async () => {
      try {
        setIsLoading( true )
        const { data: userData } = await axios( {
          method: 'get',
          url: `${Config.AIRTABLE_SERVER_URL}/user/${realmUsername}`,
          headers: {
            Authorization: `Bearer ${realmAccessToken}`,
          },
        } )
        setIsLoading( false )
        setUser( userData )
      } catch ( err ) {
        setIsLoading( false )
        setError( err.message )
        toast( {
          title: 'Error getting your user profile',
          description: `Error Detail: ${err.message}. Screenshot this error and send it in the slack channel #ccc-help for assistance.`,
          status: 'error',
          duration: 18000,
          isClosable: true,
        } )
        console.error( `Airtable API Server error fetching user: ${err.message}` )
      }
    },
    // Realm is our primary auth, so we only perform Airtable actions
    // if the Realm auth session is valid
    [realmUsername, realmAccessToken, toast],
  )

  const getBookings = useCallback(
    async () => {
      try {
        setIsLoading( true )
        const { data: bookingsMap } = await axios( {
          method: 'get',
          url: `${Config.AIRTABLE_SERVER_URL}/user/${realmUsername}/booking`,
          headers: {
            Authorization: `Bearer ${realmAccessToken}`,
          },
        } )
        setIsLoading( false )
        setBookings( bookingsMap )
      } catch ( err ) {
        setIsLoading( false )
        setError( err.message )
        toast( {
          title: 'Error getting your bookings',
          description: `Error Detail: ${err.message}. Screenshot this error and send it in the slack channel #ccc-help for assistance.`,
          status: 'error',
          duration: 18000,
          isClosable: true,
        } )
        console.error( `Airtable API Server error fetching user bookings: ${err.message}` )
      }
    },
    // Realm is our primary auth, so we only perform Airtable actions
    // if the Realm auth session is valid
    [realmUsername, realmAccessToken, toast],
  )

  const getBooking = useCallback(
    async ( recordId ) => {
      try {
        setIsLoading( true )
        const { data: bookingData } = await axios( {
          method: 'get',
          url: `${Config.AIRTABLE_SERVER_URL}/user/${realmUsername}/booking/${recordId}`,
          headers: {
            Authorization: `Bearer ${realmAccessToken}`,
          },
        } )
        setIsLoading( false )
        setBookings( {
          ...bookings,
          [bookingData.recordId]: bookingData,
        } )
      } catch ( err ) {
        setIsLoading( false )
        setError( err.message )
        toast( {
          title: 'Error getting your booking',
          description: `Error Detail: ${err.message}. Screenshot this error and send it in the slack channel #ccc-help for assistance.`,
          status: 'error',
          duration: 18000,
          isClosable: true,
        } )
        console.error( `Airtable API Server error fetching user booking ${recordId}: ${err.message}` )
      }
    },
    // Realm is our primary auth, so we only perform Airtable actions
    // if the Realm auth session is valid
    [realmUsername, realmAccessToken, bookings, toast],
  )

  const deleteBooking = useCallback(
    async ( recordId ) => {
      try {
        setIsLoading( true )
        await axios( {
          method: 'delete',
          url: `${Config.AIRTABLE_SERVER_URL}/user/${realmUsername}/booking/${recordId}`,
          headers: {
            Authorization: `Bearer ${realmAccessToken}`,
          },
        } )
        setIsLoading( false )
        const nBookings = { ...bookings }
        delete nBookings[recordId]
        setBookings( nBookings )
        toast( {
          title: 'Booking deleted successfully',
          description: 'Go ahead and create a new booking to start over',
          status: 'success',
          duration: 9000,
          isClosable: true,
        } )
      } catch ( err ) {
        setIsLoading( false )
        setError( err.message )
        toast( {
          title: 'Error deleting your booking',
          description: `Error Detail: ${err.message}. Screenshot this error and send it in the slack channel #ccc-help for assistance.`,
          status: 'error',
          duration: 18000,
          isClosable: true,
        } )
        console.error( `Airtable API Server error deleting user booking ${recordId}: ${err.message}` )
      }
    },
    // Realm is our primary auth, so we only perform Airtable actions
    // if the Realm auth session is valid
    [realmUsername, realmAccessToken, bookings, toast],
  )

  useEffect( () => {
    getUser()
    getBookings()
  }, [getUser, getBookings] )

  const airtableDataWithMethods = {
    user,
    getUser,
    bookings,
    getBookings,
    getBooking,
    deleteBooking,
    isLoading,
    error,
  }

  return (
    <AirtableContext.Provider value={airtableDataWithMethods}>
      {children}
    </AirtableContext.Provider>
  )
}

AirtableProvider.propTypes = {
  children: PropTypes.oneOfType( [
    PropTypes.node,
    PropTypes.arrayOf( PropTypes.node ),
  ] ).isRequired,
}
