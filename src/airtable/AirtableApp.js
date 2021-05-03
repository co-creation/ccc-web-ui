import React, { useContext, useState, useEffect, useCallback } from 'react'
import Airtable from 'airtable'

import { useRealmApp } from '../RealmApp'
import Config from '../Config'

const AirtableContext = React.createContext()

// TODO WARNING this is temporary and exposes a vulnerability because the airtable api key can be sniffed in network requests and impersonated
const base = new Airtable( { apiKey: Config.AIRTABLE_API_KEY } )
  .base( Config.AIRTABLE_BASE_ID )
const peopleTable = base( Config.AIRTABLES.PEOPLE )
const bookingsTable = base( Config.AIRTABLES.BOOKINGS )

export const useAirtable = () => {
  const airtable = useContext( AirtableContext )
  if ( !airtable ) {
    throw new Error(
      `You must call useAirtable() inside of a <AirtableProvider />`
    )
  }
  return airtable
}

export const AirtableProvider = ( { children } ) => {
  
  // TODO this isn't great since the data may not consistently appear in time for consumers
  const [ airtableUser, setAirtableUser ] = useState( null )
  const [ userBookings, setUserBookings ] = useState( null )

  const realmApp = useRealmApp()
  const currentRealmUsername = realmApp?.currentUser?._profile?.data?.email

  const refreshUserData =  useCallback(
    () => { 
      console.log( 'Refreshing Airtable User' )
      peopleTable.select( {
        view: 'Base Table'
      } )
      .firstPage( ( err, peopleRecords ) => {
        if ( err ) {
          console.error( err )
          return
        }
        const airtableUserMatchingRealm = peopleRecords.find( record => record?.fields?.Email === currentRealmUsername )
        setAirtableUser( airtableUserMatchingRealm?.fields )
      } )
    } ,
    [ currentRealmUsername ]
  )

  // 'Username' is a record ref in the airtable data, so we needed to copyit over to a formula field
  const airtableBookingUsername = airtableUser?.Username
  const refreshUserBookings = useCallback( 
    () => { 
    console.log( 'Refreshing Airtable User Bookings' )
    // TODO WARNING — firstPage only grabs the first 100 records... paginate when users grow.
    bookingsTable.select( {
      view: 'Base Table'
    } )
    .firstPage( ( err, bookingsRecords ) => {
      if ( err ) {
        console.error( err )
        return
      }
      const userBookingRecords = bookingsRecords.filter( record => { 
        return record?.fields?.[ 'Username Readable' ] === airtableBookingUsername
       } )
      //  // Only pass down the record data to make it read only 
      //  const userBookingData = userBookingRecords.map( record => record.fields )
      console.log( 'New bookings after query', userBookingRecords )
      setUserBookings( userBookingRecords )
    } )
  },
  [ airtableBookingUsername ]
  )

  useEffect( () => { 
    refreshUserData()
  }, [ refreshUserData ] )

  useEffect( () => { 
    refreshUserBookings()
  }, [ refreshUserBookings ] )

  const baseWithUser = { 
    base,
    peopleTable, 
    bookingsTable,  
    user : airtableUser, 
    refreshUserData,
    userBookings, 
    refreshUserBookings
  }

  return (
    <AirtableContext.Provider value={baseWithUser}>
      {children}
    </AirtableContext.Provider>
  )
}