import React from 'react'

import {
  Flex,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'

import { SignInBackground } from '../assets/images/index'
import { ResetPasswordForm } from '../forms'

export default function ResetPasswordScreen() {
  const isMobile = useBreakpointValue( { base: true, md: false } )

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      minH="100vh"
      minW="100vw"
      maxW={{ xl: '1200px' }}
      m="0 auto"
    >
      {isMobile
        && (
        <Flex
          style={{
            backgroundImage: `url(${SignInBackground})`,
            backgroundPosition: 'center',
            minHeight: '100vh',
            width: '100vw',
            backgroundSize: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            p="12px"
            w="284px"
            h="350px"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            bg="base.25"
          >
            <ResetPasswordForm />
          </Box>
        </Flex>
        )}
      {!isMobile
        && (
        <Flex style={{
          height: '100vh',
          width: '100%',
        }}
        >
          <Flex
            w="50vw"
            grow={1}
            style={{
              backgroundImage: `url(${SignInBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Flex
            w="50vw"
            align="center"
            justify="center"
            grow={1}
          >
            <Box
              w="400px"
              bg="white"
              align="center"
              justify="center"
            >
              <ResetPasswordForm />
            </Box>
          </Flex>
        </Flex>
        )}
    </Flex>
  )
}
