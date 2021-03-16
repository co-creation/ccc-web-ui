import React from "react"
import { Button } from '@chakra-ui/react'

import { useRealmApp } from "./RealmApp"
import RealmApolloProvider from "./graphql/RealmApolloProvider"
import SignInScreen from "./screens/SignInScreen"

const WelcomeScreen = ( ) => { 
  const app = useRealmApp()
  return ( 
    <>
      <div>
        Hello World
      </div>
     <Button
        mt={4}
        colorScheme="teal"
        onClick={app.logOut}>
        Sign Out
      </Button>
    </>
  )
}

const RequireLoggedInUser = ( ) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp()
  return app.currentUser ? <WelcomeScreen /> : <SignInScreen />
}

export default function App() {
  return (
    <RequireLoggedInUser>
      <RealmApolloProvider>
        <div>This is the internal app content. hello world.</div>
      </RealmApolloProvider>
    </RequireLoggedInUser>
  )
}
