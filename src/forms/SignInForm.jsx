import React from 'react'
import * as Realm from 'realm-web'
import validate from 'validator'
import { useHistory } from 'react-router-dom'
import {
  Flex,
  Input,
  Image,
  FormErrorMessage,
  FormLabel,
  FormControl,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useRealmApp } from '../RealmApp'
import { LogoFull }  from '../assets/images/index'
import { RoundButtonSolid } from '../components'

export default function SignInForm( props ) {

  const app = useRealmApp()
  const history = useHistory()
  const toast = useToast()
  const [ isLoggingIn, setIsLoggingIn ] = React.useState( false )
  const { handleSubmit, errors, register, formState } = useForm()
  
  const handleLogin = async ( email, password ) => {
    setIsLoggingIn( true )
    // setError( ( e ) => ( { ...e, password: null } ) )
    try {
      await app.logIn( Realm.Credentials.emailPassword( email, password ) )
      history.push( '/home' )
    } catch ( err ) {
      setIsLoggingIn( false )
      toast( {
        title: "Incorrect Email or Password",
        description: "Are you sure your email and password are correct? Check your welcome email and try again. Reach out to cocreationcastle@gmail.com if you need any help.",
        status: "error",
        duration: 9000,
        isClosable: true,
      } )
      console.error( err ) // todo deal with this error 
      // handleAuthenticationError( err, setError )
    }
  }

  function onSubmit( { email, password } ) {
    handleLogin( email, password )
    console.log( 'logging in...' )
  }
  
  return (
  <Flex direction='column'>
    <Image src={LogoFull} p="12px"/>
      <form onSubmit={handleSubmit( onSubmit )}>
      <FormControl isInvalid={errors.email} id="email" p="12px">
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="email"
          autoComplete="email"
          ref={register( { validate: validate.isEmail } )}
        />
      </FormControl>
      <FormControl isInvalid={errors.password} p="12px">
        <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            name="password"
            placeholder="password"
            autoComplete="password"
            type="password"
            ref={register()}
          />
          <FormErrorMessage>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>
        <RoundButtonSolid
          isLoading={formState.isSubmitting || isLoggingIn}
          loadingText="Signing In..."
          mt={4}
          w="100%"
          colorScheme="primary"
          type="submit"
          p="12px"
        >
          Sign In
        </RoundButtonSolid>
      </form>
    </Flex>
  )
}