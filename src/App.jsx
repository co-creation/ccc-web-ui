import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import RealmApolloProvider from './graphql/RealmApolloProvider'
import { AirtableProvider } from './airtable/AirtableApp'

import { Routes } from './navigation'

export default function App() {
  return (
    <RealmApolloProvider>
      <AirtableProvider>
        <Router>
          <Routes />
        </Router >
      </AirtableProvider>
    </RealmApolloProvider >
  )
}