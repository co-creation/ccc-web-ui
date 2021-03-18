import { Route, Switch } from 'react-router-dom'

import { SignInScreen, WelcomeScreen } from "../screens"
import AuthenticatedRoute from './AuthenticatedRoute'

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/signin' component={SignInScreen} />
      <AuthenticatedRoute exact path='/welcome'>
        <WelcomeScreen />
      </AuthenticatedRoute>
    </Switch>
  )
}