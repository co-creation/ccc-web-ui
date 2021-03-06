import React from 'react'
import * as Realm from 'realm-web'
import { useHistory, Link as RouterLink } from 'react-router-dom'
import {
  Flex,
  Input,
  Image,
  Link,
  FormErrorMessage,
  FormLabel,
  FormControl,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { validate } from '../utils'
import { useRealmApp } from '../RealmApp'
import { LogoFull } from '../assets/images/index'
import { RoundButtonSolid } from '../components'

export default function SignInForm( ) {
  const app = useRealmApp()
  const history = useHistory()
  const toast = useToast()
  const [isLoggingIn, setIsLoggingIn] = React.useState( false )
  const {
    handleSubmit,
    formState: { errors },
    register,
    formState,
  } = useForm()
  const handleLogin = async ( email, password ) => {
    setIsLoggingIn( true )
    try {
      await app.logIn( Realm.Credentials.emailPassword( email, password ) )
      history.push( '/home' )
    } catch ( err ) {
      setIsLoggingIn( false )
      toast( {
        title: 'Incorrect Email or Password',
        description: 'Are you sure your email and password are correct? Check your welcome email and try again. Reach out to cocreationcastle@gmail.com if you need any help.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      } )
    }
  }

  function onSubmit( { email, password } ) {
    handleLogin( email?.trim().toLowerCase(), password?.trim() )
    console.log( `Signing in as: ${email}` )
  }

  const isLoading = formState.isSubmitting || isLoggingIn

  return (
    <Flex direction="column">
      <Image src={LogoFull} p="12px" />
      <form onSubmit={handleSubmit( onSubmit )}>
        <FormControl
          isInvalid={errors.email}
          isRequired
          mb="12px"
        >
          <FormLabel htmlFor="email">
            Email
          </FormLabel>
          <Input
            name="email"
            placeholder="Enter email"
            autoComplete="email"
            mb="12px"
            {...register( 'email', { validate: validate.email } )}
          />
          <FormErrorMessage>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.password}
          isRequired
          mb="12px"
        >
          <FormLabel htmlFor="password">
            Password
          </FormLabel>
          <Input
            name="password"
            placeholder="Enter password"
            autoComplete="password"
            type="password"
            {...register( 'password' )}
          />
        </FormControl>
        <RoundButtonSolid
          isLoading={isLoading}
          disabled={errors.length}
          loadingText="Signing in..."
          mt={4}
          w="100%"
          colorScheme="primary"
          type="submit"
          p="12px"
        >
          Sign In
        </RoundButtonSolid>
      </form>
      <Link
        as={RouterLink}
        to="/reset-password"
        fontWeight="600"
        color="secondary.700"
        mt="24px"
      >
        Forgot Your Password?
      </Link>
    </Flex>
  )
}
