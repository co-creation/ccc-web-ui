import { Button } from '@chakra-ui/react'

import { useRealmApp } from '../RealmApp'

/**
 * @function WelcomeSceen returns the welcome screen
 * @component
 * @returns {ReactNode} 
 */
export default function WelcomeScreen() {
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