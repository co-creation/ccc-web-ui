import React from "react"
import { BrowserRouter as Router } from 'react-router-dom'

import RealmApolloProvider from "./graphql/RealmApolloProvider"
import { Routes } from "./navigation"

export default function App() {
  return (
    <RealmApolloProvider>
      <Router>
        <Routes />
      </Router >
    </RealmApolloProvider >
  )
}
