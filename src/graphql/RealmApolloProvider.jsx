import React from 'react'
import PropTypes from 'prop-types'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { useRealmApp } from '../RealmApp'

// Create an ApolloClient that connects to the provided Realm.App's GraphQL API
const createRealmApolloClient = ( app ) => {
  console.log( 'Creating Realm Apollo Client' )
  const link = new HttpLink( {
    uri: `https://realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`,
    // A custom fetch handler adds the logged in user's access token to GraphQL requests
    fetch: async ( uri, options ) => {
      if ( !app.currentUser ) {
        throw new Error( 'Must be logged in to use the GraphQL API' )
      }
      // Refreshing a user's custom data also refreshes their access token
      await app.currentUser.refreshCustomData()
      // The handler adds a bearer token Authorization header to the otherwise unchanged request
      // eslint-disable-next-line no-param-reassign
      options.headers.Authorization = `Bearer ${app.currentUser.accessToken}`
      return fetch( uri, options )
    },
  } )

  const cache = new InMemoryCache()

  return new ApolloClient( { link, cache } )
}

export default function RealmApolloProvider( { children } ) {
  const app = useRealmApp()
  const [client, setClient] = React.useState( createRealmApolloClient( app ) )
  React.useEffect( () => {
    setClient( createRealmApolloClient( app ) )
  }, [app] )
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

RealmApolloProvider.propTypes = {
  children: PropTypes.oneOfType( [
    PropTypes.node,
    PropTypes.arrayOf( PropTypes.node ),
  ] ).isRequired,
}
