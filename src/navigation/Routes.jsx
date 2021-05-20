import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import {
  SignInScreen,
  HomeScreen,
  BookingScreen,
  BookingV2Screen,
  CheckoutScreen,
} from '../screens'
import AuthenticatedRoute from './AuthenticatedRoute'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/signin" component={SignInScreen} />
      <AuthenticatedRoute exact path="/home">
        <HomeScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/booking">
        <BookingScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/booking-v2">
        <BookingV2Screen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/booking/checkout">
        <CheckoutScreen />
      </AuthenticatedRoute>
      {/* The redirect below should be the last route in the switch to catch all including '/' */}
      <Redirect to="/home" />
    </Switch>
  )
}
