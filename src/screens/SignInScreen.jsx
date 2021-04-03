import React from "react"
import * as Realm from "realm-web"
import validate from 'validator'
import { useHistory } from "react-router-dom"
import {
  Flex,
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import { useRealmApp } from "../RealmApp"

export default function SignInScreen() {
  const app = useRealmApp()
  const history = useHistory()

  const [isLoggingIn, setIsLoggingIn] = React.useState( false )
  const handleLogin = async ( email, password ) => {
    setIsLoggingIn( true )
    // setError( ( e ) => ( { ...e, password: null } ) )
    try {
      await app.logIn( Realm.Credentials.emailPassword( email, password ) )
      history.push( '/home' )
    } catch ( err ) {
      setIsLoggingIn( false )
      console.error( err ) // todo deal with this error 
      // handleAuthenticationError( err, setError )
    }
  }

  const { handleSubmit, errors, register, formState } = useForm()

  function onSubmit( { email, password } ) {
    handleLogin( email, password )
    console.log( 'logging in...' )
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100%"
      maxW={{ xl: "1200px" }}
      m="0 auto">
      <Heading 
        as="h2" 
        size="lg" 
        p="16px">
          The Co-Creation Castle
      </Heading>
      <Box p={8} w="350px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <form onSubmit={handleSubmit( onSubmit )}>
        <FormControl isRequired isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            placeholder="siena@gmail.com"
            ref={register( { validate: validate.isEmail } )}
          />
          <FormErrorMessage>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            placeholder="**********"
            type="password"
            ref={register( { validate: () => { return true } } )}
          />
          <FormErrorMessage>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>
      
          <Button
            isLoading={formState.isSubmitting || isLoggingIn}
            loadingText="Signing In..."
            mt={4}
            w="100%"
            colorScheme="primary"
            type="submit">
            Sign In
          </Button>
      </form>
      </Box>
    </Flex>
  )
}

// function handleAuthenticationError( err, setError ) {
//   const { status, message } = parseAuthenticationError( err )
//   const errorType = message || status
//   switch ( errorType ) {
//     case "invalid username":
//       setError( ( prevErr ) => ( { ...prevErr, email: "Invalid email address." } ) )
//       break
//     case "invalid username/password":
//     case "invalid password":
//     case "401":
//       setError( ( err ) => ( { ...err, password: "Incorrect password." } ) )
//       break
//     case "name already in use":
//     case "409":
//       setError( ( err ) => ( { ...err, email: "Email is already registered." } ) )
//       break
//     case "password must be between 6 and 128 characters":
//     case "400":
//       setError( ( err ) => ( {
//         ...err,
//         password: "Password must be between 6 and 128 characters.",
//       } ) )
//       break
//     default:
//       break
//   }
// }

// function parseAuthenticationError( err ) {
//   const parts = err.message.split( ":" )
//   const reason = parts[parts.length - 1].trimStart()
//   if ( !reason ) return { status: "", message: "" }
//   const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/
//   const match = reason.match( reasonRegex )
//   const { status, message } = match?.groups ?? {}
//   return { status, message }
// }
