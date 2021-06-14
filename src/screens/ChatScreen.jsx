import React from 'react'
import {
  // Heading,
  // Button,
  Container,
} from '@chakra-ui/react'
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  InfiniteScrollPaginator,
  MessageInput,
  MessageInputFlat,
  MessageList,
  MessageTeam,
  Thread,
  Window,
} from 'stream-chat-react'
import { StreamChat } from 'stream-chat'

import { useChatAuth } from '../chat'
import Config from '../Config'
import { Layout } from '../components'

import 'stream-chat-react/dist/css/index.css'

const filters = { type: 'messaging' }
const sort = { last_message_at: -1 }
const theme = 'messaging light'

const Paginator = ( props ) => (
  <InfiniteScrollPaginator
    threshold={300}
    {...props}
  />
)

const chatClient = StreamChat.getInstance( Config.CHAT_API_KEY )

export default function ChatScreen() {
  const { token, userId } = useChatAuth()
  const [connected, setConnected] = React.useState( false )
  console.log( 'token, userId', token, userId )

  React.useEffect( () => {
    if ( token ) {
      chatClient.connectUser( { id: userId }, token )
      setConnected( true )
    }
    return () => chatClient.disconnectUser()
  }, [token, userId] )

  if ( !connected ) {
    return null
  }

  return (
    <Layout>
      <Container
        maxW="container.lg"
      >
        <Chat
          client={chatClient}
          theme={theme}
        >
          <ChannelList
            filters={filters}
            sort={sort}
            Paginator={Paginator}
          />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList Message={MessageTeam} />
              <MessageInput Input={MessageInputFlat} />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </Container>
    </Layout>
  )
}
