import { StreamChat } from 'stream-chat'

import Config from '../Config'

const chatClient = StreamChat.getInstance( Config.CHAT_API_KEY )

export default chatClient
