import React from 'react'
// import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
import {
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react'

import { Layout } from '../components'

export default function PersonalDevelopmentScreen() {
  return (
    <Layout>
      <Flex
        flex="1"
        direction="column"
        w="100%"
        pl="10"
        pr="10"
      >
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
          Wet&apos;re excited for you to co-create in our CCC Personal Development Tracks!
          Personal Development Tracks (PDTs) are a consistent experience 2+ Co-Creators
          go through during the CCC to focus on growing in their blooming intentions / personal
          development goals / dream activation.
          PDTs are meant for anything you hope to learn, share, or teach before,
          during, and after your physical stay in Jim Thorpe this CCCeason (May 28 - July 5).
        </Text>
        <Heading
          m="5"
          mb="2"
          ml="0"
          as="h2"
          size="md"
        >
          Personal Development Interest & Proposal Form
        </Heading>
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
              color: 'white',
              cursor: 'pointer',
              fontFamily: 'Helvetica,Arial,sans-serif',
              fontSize: '20px',
              lineHeight: '50px',
              textAlign: 'center',
              margin: 0,
              height: '50px',
              padding: '0px 33px',
              borderRadius: '25px',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
              webkitFontSmoothing: 'antialiased',
              mozOsxFontSmoothing: 'grayscale',
            }}
            dataSize="70"
            target="_blank"
            rel="noreferrer"
          >
            Sign Up
          </a>
        </div>
      </Flex>
    </Layout>
  )
}
