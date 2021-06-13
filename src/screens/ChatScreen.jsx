import React from 'react'
import {
  // Heading,
  // Button,
  Container,
} from '@chakra-ui/react'
import { StreamChat } from 'stream-chat'
// import {
//   Chat,
//   Channel,
//   ChannelList, MessageList, MessageInput, Window,
// } from 'stream-chat-react';

import Config from '../Config'
import { Layout } from '../components'
// import Utils from '../utils'

export default function ChatScreen() {
  return (
    <Layout>
      <Container maxW="container.lg">
        {/* <Heading m="5" mb="2" ml="0" as="h2" size="md">
          CCChat With Friends
        </Heading> */}
      </Container>
    </Layout>
  )
}
