import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import RealmApolloProvider from './graphql/RealmApolloProvider'
import { AirtableProvider } from './airtable/AirtableApp'
import { ChatAuthProvider } from './chat'

import { Routes } from './navigation'

export default function App() {
  return (
    <RealmApolloProvider>
      <ChatAuthProvider>
        <AirtableProvider>
          <Router>
            <Routes />
          </Router>
        </AirtableProvider>
      </ChatAuthProvider>
    </RealmApolloProvider>
  )
}
