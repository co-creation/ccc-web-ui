import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import RealmApolloProvider from './graphql/RealmApolloProvider'
import StripeProvider from './stripe/StripeProvider'
import { AirtableProvider } from './airtable/AirtableApp'

import { Routes } from './navigation'

export default function App() {
  return (
    <RealmApolloProvider>
      <AirtableProvider>
      <StripeProvider>
        <Router>
          <Routes />
        </Router >
      </StripeProvider>
      </AirtableProvider>
    </RealmApolloProvider >
  )
}