import React from 'react'

import App from './App'
import { RealmAppProvider } from './RealmApp'

import Config from './Config'

export default function AppRoot() {
  return (
    <RealmAppProvider appId={Config.REALM_APP_ID}>
      <App />
    </RealmAppProvider>
  )
}
