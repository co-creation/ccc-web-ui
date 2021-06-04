import React from 'react'
import {
  Heading,
  Text,
  Button,
  Container,
} from '@chakra-ui/react'

import {
  Layout,
} from '../components'
import Utils from '../utils'

export default function MealPlanScreen() {
  return (
    <Layout>
      <Container maxW="container.lg">
        <Heading m="5" mb="2" ml="0" as="h2" size="md">
          Sign up to Co-Chef
        </Heading>
        <Text>
          Co-Chefing communal dinners with your co-creators
          is an integral part of the experience.
          It&apos;s a way to care for your co-creators, to learn from and share
          in each other&apos;s cultural heritages, to focus on sustainability and wellness,
          and to make unforgettable memories.
        </Text>
        <Button
          colorScheme="primary"
          borderRadius="full"
          size="sm"
          my="5"
          color="base.900"
          onClick={() => Utils.openNewTab( 'https://airtable.com/shr2kADLOlovcK3xI' )}
        >
          Sign Up
        </Button>
        <Heading m="5" mb="2" ml="0" as="h2" size="md">
          Meal Plan Schedule
        </Heading>
        <iframe
          title="Meal Plan Schedule"
          className="airtable-embed"
          src="https://airtable.com/embed/shrMKIStXtCB29gQd?backgroundColor=yellow&viewControls=on"
          frameBorder="0"
          width="100%"
          height="633px"
          style={{
            background: 'transparent',
            border: '1px solid #ccc',
            borderRadius: 4,
            marginBottom: 16,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
          }}
        />
      </Container>
    </Layout>
  )
}
