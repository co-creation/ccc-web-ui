import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import {
  SignInScreen,
  HomeScreen,
  BookingScreen,
  CheckoutScreen,
  MealPlanScreen,
  PersonalDevelopmentScreen,
  SetNewPasswordScreen,
  ResetPasswordScreen,
} from '../screens'
import AuthenticatedRoute from './AuthenticatedRoute'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/sign-in" component={SignInScreen} />
      <Route exact path="/set-password" component={SetNewPasswordScreen} />
      <Route exact path="/reset-password" component={ResetPasswordScreen} />
      <AuthenticatedRoute exact path="/home">
        <HomeScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/booking">
        <BookingScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/booking/checkout">
        <CheckoutScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/meal-plan">
        <MealPlanScreen />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/personal-development">
        <PersonalDevelopmentScreen />
      </AuthenticatedRoute>
      {/* The redirect below should be the last route in the switch to catch all including '/' */}
      <Redirect to="/home" />
    </Switch>
  )
}
