import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import Config from '../Config'

const stripePromise = loadStripe( Config.STRIPE_API_KEY )

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Montserrat"
    }
  ]
}

/**
 * @function StripeProvider Provide access within children components to the authenticated Stripe object
 * @param {Array} props.children 
 * @returns {ReactNode} Children wrapped in the authenticated Stripe elements provider
 */
const StripeProvider = ( { children } ) => {
  return (
    <Elements 
      stripe={stripePromise}
      options={ELEMENTS_OPTIONS}
      >
      {children}
    </Elements>
  )
}

export default StripeProvider
