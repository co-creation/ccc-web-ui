import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

import { useRealmApp } from '../RealmApp'
import Config from '../Config'

const ChatAuthContext = React.createContext()

export const useChatAuth = () => {
  const chatAuth = useContext( ChatAuthContext )
  if ( !chatAuth ) {
    throw new Error(
      'You must call useChatAuth() inside of a <ChatAuthContext />',
    )
  }
  return chatAuth
}

export const ChatAuthProvider = ( { children } ) => {
  const [token, setToken] = useState( null )
  const [expiresAt, setExpiresAt] = useState( null )
  const [issuedAt, setIssuedAt] = useState( null )
  const [isLoading, setIsLoading] = useState( false )
  const [error, setError] = useState( '' )
  const toast = useToast()

  const realmApp = useRealmApp()
  // eslint-disable-next-line no-underscore-dangle
  const realmUsername = realmApp?.currentUser?._profile?.data?.email
  const realmAccessToken = realmApp.currentUser?.accessToken

  const getToken = useCallback(
    async () => {
      try {
        setIsLoading( true )
        const { data } = await axios( {
          method: 'get',
          url: `${Config.CHAT_API_SERVER_URL}/user/${realmUsername}/token`,
          headers: {
            Authorization: `Bearer ${realmAccessToken}`,
          },
        } )
        const { token: tkn, expiresAt: exp, issuedAt: iat } = data
        setIsLoading( false )
        setToken( tkn )
        setExpiresAt( exp )
        setIssuedAt( iat )
      } catch ( err ) {
        setIsLoading( false )
        setError( err.message )
        toast( {
          title: 'Error enabling chat',
          description: `Error: ${err.message}. Screenshot this error and send it in the slack channel #ccc-help for assistance.`,
          status: 'error',
          duration: 9000,
          isClosable: true,
        } )
        console.error( `Chat API Server error: ${err.message}` )
      }
    },
    [realmUsername, realmAccessToken, toast],
  )

  useEffect( () => {
    if ( realmUsername && !token ) {
      getToken()
    }
  }, [getToken, token, realmUsername] )

  const session = {
    getToken,
    token,
    issuedAt,
    expiresAt,
    isLoading,
    error,
  }

  return (
    <ChatAuthContext.Provider value={session}>
      {children}
    </ChatAuthContext.Provider>
  )
}

ChatAuthProvider.propTypes = {
  children: PropTypes.oneOfType( [
    PropTypes.node,
    PropTypes.arrayOf( PropTypes.node ),
  ] ).isRequired,
}