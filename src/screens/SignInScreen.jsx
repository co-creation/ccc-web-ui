import React from "react"
import * as Realm from "realm-web"
import validator from "validator"
import { useHistory } from "react-router-dom"
import {
  Flex,
  Input,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  ButtonGroup,
  Box,
  Heading,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import { useRealmApp } from "../RealmApp"

export default function SignInScreen() {
  const app = useRealmApp()
  const history = useHistory()

  // Toggle between logging users in and registering new users
  const [mode, setMode] = React.useState( "login" )
  const toggleMode = () => {
    setMode( ( oldMode ) => ( oldMode === "login" ? "register" : "login" ) )
  }

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

  const handleRegistrationAndLogin = async ( email, password ) => {
    const isValidEmailAddress = validator.isEmail( email )
    // setError( ( e ) => ( { ...e, password: null } ) )

    if ( isValidEmailAddress ) {
      try {
        // Register the user and, if successful, log them in
        await app.emailPasswordAuth.registerUser( email, password )
        return await handleLogin( email, password )
      } catch ( err ) {
        // todo handle this error 
        console.error( err )
        // handleAuthenticationError( err, setError )
      }
    } else {
      console.error( 'Invalid Email', email )
    }
  }

  const { handleSubmit, errors, register, formState } = useForm()

  function validateEmail( value ) {
    return true;
  }

  function validatePassword( value ) {
    return true;
  }


  function onSubmit( { email, password } ) {
    if ( mode === "login" ) {
      handleLogin( email, password )
      console.log( 'logging in...' )
    }
    else {
      handleRegistrationAndLogin( email, password )
      console.log( 'registering user and logging in...' )
    }
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
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <form onSubmit={handleSubmit( onSubmit )}>
        <FormControl isRequired isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            placeholder="siena@gmail.com"
            ref={register( { validate: validateEmail } )}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            placeholder="**********"
            type="password"
            ref={register( { validate: validatePassword } )}
          />
          <FormErrorMessage>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <ButtonGroup variant="solid" spacing="6">
          <Button
            isLoading={formState.isSubmitting || isLoggingIn}
            loadingText={mode === 'login' ? 'Signing In...' : 'Registering...'}
            mt={4}
            w="40"
            colorScheme="green"
            type="submit">
            {mode === 'login' ? 'Sign In' : 'Register'}
          </Button>
          <Button
            mt={4}
            w="40"
            colorScheme="blue"
            onClick={toggleMode}>
            {mode === 'login' ? 'Register Instead' : 'Sign In Instead'}
          </Button>
        </ButtonGroup>
      </form>
      </Box>
    </Flex>
  )
}

// TODO start using these parsers 
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
