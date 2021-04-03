import { Route, Switch, Redirect } from 'react-router-dom'

import { 
  SignInScreen, 
  HomeScreen, 
  BookAccomodationScreen, 
  CheckoutScreen,
} from "../screens"
import AuthenticatedRoute from './AuthenticatedRoute'

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/signin' component={SignInScreen} />
      <AuthenticatedRoute exact path='/home'>
        <HomeScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path='/book'>
        <BookAccomodationScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path='/payment'>
        <CheckoutScreen />
      </AuthenticatedRoute>
      {/* The redirect below should be the last route in the switch — the catch all, including '/' */}
      <Redirect to="/home" />
    </Switch>
  )
}