import React from "react"

import App from "./App"
import Config from './Config'
import { RealmAppProvider } from "./RealmApp"



export default function AppRoot() {
  return (
    <RealmAppProvider appId={Config.REALM_APP_ID}>
      <App />
    </RealmAppProvider>
  )
}
