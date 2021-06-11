import React from 'react'
import {
  Heading,
  Text,
  Container,
  Button,
} from '@chakra-ui/react'

import { Layout } from '../components'

export default function PersonalDevelopmentScreen() {
  return (
    <Layout>
      <Container maxW="container.lg">
        <Heading
          m="5"
          mb="2"
          ml="0"
          as="h2"
          size="md"
        >
          Personal Development Tracks
        </Heading>
        <Text>
          We&apos;re excited for you to co-create in our CCC Personal Development Tracks!
          Personal Development Tracks (PDTs) are a consistent experience 2+ Co-Creators
          go through during the CCC to focus on growing in their blooming intentions / personal
          development goals / dream activation.
          <br />
          <br />
          PDTs are meant for anything you hope to learn, share, or teach before,
          during, and after your physical stay in Jim Thorpe this CCCeason (May 28 - July 5).
        </Text>
        <div
          style={{
            paddingTop: '8px',
          }}
        >
          <a
            className="typeform-share button"
            href="https://form.typeform.com/to/qL4HkIfa?typeform-medium=embed-snippet"
            data-mode="popup"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              backgroundColor: '#FAA307',
              color: 'base.900',
              fontWeight: 'bold',
              cursor: 'pointer',
              lineHeight: '32px',
              fontSize: '14px',
              textAlign: 'center',
              margin: 0,
              height: '32px',
              padding: '0px 16px',
              borderRadius: '24px',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
            datasize="70"
            target="_blank"
            rel="noreferrer"
          >
            Get Involved
          </a>
        </div>
        <Heading
          m="5"
          mb="2"
          ml="0"
          as="h2"
          size="md"
        >
          Blooming Season
        </Heading>
        <Text>
          The CCC launched as the Super Flower Moon of wildflower Blooming CCCeason emerged.
          <br />
          <br />
          We co-created a few tools to support community flourishing and dream activation.
        </Text>
        <Heading
          m="5"
          mb="2"
          ml="0"
          as="h6"
          size="xs"
        >
          Discover Your Intentions
        </Heading>
        <Button
          colorScheme="primary"
          color="base.900"
          borderRadius="full"
          px="16px"
          lineHeight="1"
          size="sm"
          mt="16px"
          mb="16px"
          onClick={() => window.open( 'https://calendly.com/co-creation-c___/blooming-intention-session?month=2021-06' )}
        >
          Schedule Blooming Call
        </Button>
        <Heading
          m="5"
          mb="2"
          ml="0"
          as="h6"
          size="xs"
        >
          Set Your Blooming Intention
        </Heading>
        <div
          style={{
            paddingTop: '8px',
          }}
        >
          <a
            className="typeform-share button"
            href="https://form.typeform.com/to/A72DanOQ?typeform-medium=embed-snippet"
            data-mode="popup"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              backgroundColor: '#FAA307',
              color: 'base.900',
              fontWeight: 'bold',
              cursor: 'pointer',
              lineHeight: '32px',
              fontSize: '14px',
              textAlign: 'center',
              margin: 0,
              height: '32px',
              padding: '0px 16px',
              borderRadius: '24px',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
            datasize="70"
            target="_blank"
            rel="noreferrer"
          >
            Set Intention
          </a>
        </div>
        <Heading
          m="5"
          mb="2"
          ml="0"
          as="h6"
          size="xs"
        >
          Daily Blooming Check In
        </Heading>
        <Button
          colorScheme="primary"
          color="base.900"
          borderRadius="full"
          px="16px"
          lineHeight="1"
          size="sm"
          mt="16px"
          mb="16px"
          onClick={() => window.open( 'https://airtable.com/shrSyFYbfecM3d3v3' )}
        >
          Check In
        </Button>
      </Container>
    </Layout>
  )
}
