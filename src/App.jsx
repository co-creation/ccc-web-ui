import React from "react"
import { BrowserRouter as Router } from 'react-router-dom'

import RealmApolloProvider from './graphql/RealmApolloProvider'
import StripeProvider from './stripe/StripeProvider'

import { Routes } from "./navigation"

export default function App() {
  return (
    <RealmApolloProvider>
      <StripeProvider>
        <Router>
          <Routes />
        </Router >
      </StripeProvider>
    </RealmApolloProvider >
  )
}