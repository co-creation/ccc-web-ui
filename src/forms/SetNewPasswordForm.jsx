import React, { useState, useRef } from 'react'
import { useHistory, Link as RouterLink } from 'react-router-dom'
import {
  Flex,
  Input,
  Image,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import queryString from 'query-string'

import { validate } from '../utils'
import { useRealmApp } from '../RealmApp'
import { LogoFull } from '../assets/images/index'
import { RoundButtonSolid } from '../components'

export default function SetNewPasswordForm() {
  const app = useRealmApp()
  const history = useHistory()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState( false )
  const passwordRef = useRef( {} )
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    formState,
  } = useForm()

  passwordRef.current = watch( 'password', '' )

  const handleSetPassword = async ( password ) => {
    setIsLoading( true )
    try {
      const parsedParams = queryString.parse( history.location.search )
      const { token, tokenId } = parsedParams || {}
      if ( !token || !tokenId ) {
        throw new Error( 'Invalid password reset link' )
      }
      await app.emailPasswordAuth.resetPassword( token, tokenId, password )
      toast( {
        title: 'Password reset successful!',
        description: 'Please sign in with your new password',
        status: 'success',
        duration: 9000,
        isClosable: true,
      } )
      history.push( '/sign-in' )
    } catch ( error ) {
      setIsLoading( false )
      toast( {
        title: 'Error Setting New Password',
        description: `Error: ${error.message}. If the problem continues, please reach out for help in #ccc-help`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      } )
    }
  }

  function onSubmit( { password, confirmPassword } ) {
    console.log( 'FORM DATA', password, confirmPassword )
    handleSetPassword( password, confirmPassword )
    console.log( 'setting new password...' )
  }

  return (
    <Flex direction="column">
      <Image src={LogoFull} p="12px" />
      <Text align="left">
        Please enter your new password
      </Text>
      <form onSubmit={handleSubmit( onSubmit )}>
        <FormControl
          isInvalid={errors.password}
          isRequired
        >
          <FormLabel
            htmlFor="password"
            pt="12px"
          >
            Password
          </FormLabel>
          <Input
            name="password"
            placeholder="Enter password"
            autoComplete="password"
            type="password"
            {...register( 'password', { validate: validate.password } )}
          />
          <FormHelperText textAlign="left">
            Passwords must be at least 8 characters long,
            contain both upper and lower case letters, and no spaces.
          </FormHelperText>
          <FormErrorMessage>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={errors.confirmPassword}
          isRequired
        >
          <FormLabel
            htmlFor="confirmPassword"
            pt="24px"
          >
            Confirm Password
          </FormLabel>
          <Input
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            {...register( 'confirmPassword', {
              validate: ( value ) => value === passwordRef?.current || 'Passwords don\'t match',
            } )}
          />
          <FormErrorMessage>
            {errors.confirmPassword?.message}
          </FormErrorMessage>
        </FormControl>
        <RoundButtonSolid
          isLoading={formState.isSubmitting || isLoading}
          disabled={Object.keys( errors ).length}
          loadingText="Updating Password..."
          mt={8}
          w="100%"
          colorScheme="primary"
          type="submit"
          p="24px"
        >
          Confirm Password
        </RoundButtonSolid>
      </form>
      <Link
        as={RouterLink}
        to="/sign-in"
        fontWeight="600"
        color="secondary.700"
        mt="24px"
      >
        Cancel
      </Link>
    </Flex>
  )
}
