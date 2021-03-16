import React from "react"
import * as Realm from "realm-web"
import validator from "validator"
import { 
  Spinner, 
  Flex, 
  Input, 
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  ButtonGroup,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

import { useRealmApp } from "../RealmApp"

export default function SignInScreen() {
  const app = useRealmApp()
  
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
    maxW={{ xl: "1200px" }}
    m="0 auto">
      {isLoggingIn && (
        <Spinner 
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"/>
      )} 
      <form onSubmit={handleSubmit( onSubmit )}>
        <FormControl isInvalid={errors.name}>  
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            placeholder="email@internet.com"
            ref={register( { validate: validateEmail } )}
          />
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            placeholder="**********"
            ref={register( { validate: validatePassword } )}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <ButtonGroup variant="solid" spacing="6">
          <Button
            mt={4}
            colorScheme="cyan"
            isLoading={formState.isSubmitting}
            type="submit">
            {mode === 'login' ? 'Sign In' : 'Register'}
          </Button>
          <Button
            mt={4}
            colorScheme="blue"
            onClick={toggleMode}>
            {mode === 'login' ? 'Register Instead' : 'Sign In Instead'}
          </Button>
        </ButtonGroup>
      </form>
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
