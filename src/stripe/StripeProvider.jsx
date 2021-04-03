import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import Config from '../Config'

const stripePromise = loadStripe( Config.STRIPE_API_KEY )

/**
 * @function StripeProvider Provide access within children components to the authenticated Stripe object
 * @param {Array} props.children 
 * @returns {ReactNode} Children wrapped in the authenticated Stripe elements provider
 */
const StripeProvider = ( { children } ) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  )
}

export default StripeProvider
