import React, { useState } from 'react'
import { useHistory, Link as RouterLink } from 'react-router-dom'
import {
  Flex,
  Input,
  Image,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { validate } from '../utils'
import { useRealmApp } from '../RealmApp'
import { LogoFull } from '../assets/images/index'
import { RoundButtonSolid } from '../components'

export default function SetNewPasswordForm() {
  const app = useRealmApp()
  const history = useHistory()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState( false )
  const {
    handleSubmit,
    formState: { errors },
    register,
    formState,
  } = useForm()

  const onSendResetLink = async ( email ) => {
    setIsLoading( true )
    try {
      await app
        .emailPasswordAuth
        .sendResetPasswordEmail( email )
      toast( {
        title: 'Reset Link Sent. Check Your Email...',
        description: 'Check your spam folder if you don\'t see the email. If it doesn\'t arrive within a few seconds, then your email is not associated with an account. You\'re welcome to register for a new account with it!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      } )
      history.push( '/sign-in' )
    } catch ( error ) {
      setIsLoading( false )
      toast( {
        title: 'Error Requesting Password Reset Link',
        description: `Error: ${error.message}. If the problem continues, please reach out for help in #ccc-help`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      } )
    }
  }

  function onSubmit( { email } ) {
    onSendResetLink( email )
    console.log( 'Requesting new password reset link...' )
  }

  console.log( 'errors', errors )

  return (
    <Flex direction="column">
      <Image src={LogoFull} p="12px" />
      <Text align="left">
        Please enter your email to receive a password reset link.
      </Text>
      <form onSubmit={handleSubmit( onSubmit )}>
        <FormControl
          isInvalid={errors.email}
          isRequired
        >
          <FormLabel
            htmlFor="password"
            pt="12px"
          >
            Email
          </FormLabel>
          <Input
            name="email"
            placeholder="Enter email"
            autoComplete="email"
            type="email"
            {...register( 'email', { validate: validate.email } )}
          />
          <FormErrorMessage>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>
        <RoundButtonSolid
          isLoading={formState.isSubmitting || isLoading}
          disabled={Object.keys( errors ).length}
          loadingText="Sending Reset Link..."
          mt={8}
          w="100%"
          colorScheme="primary"
          type="submit"
          p="24px"
        >
          Request Reset Link
        </RoundButtonSolid>
      </form>
      <Link
        as={RouterLink}
        to="/sign-in"
        fontWeight="600"
        color="secondary.700"
        mt="24px"
      >
        Back to Sign In
      </Link>
    </Flex>
  )
}
