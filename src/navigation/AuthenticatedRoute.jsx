import { Route, Redirect } from 'react-router-dom'

import { useRealmApp } from "../RealmApp"

/**
 * @function AuthenticatedRoute if (user logged in) return children else return sign in screen
 * @component 
 * @param {Object} props
 * @returns {ReactNode}
 */
export default function AuthenticatedRoute( { children, ...rest } ) {
    let app = useRealmApp()

    return (
        <Route
            {...rest}
            render={( { location } ) =>
                app.currentUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}