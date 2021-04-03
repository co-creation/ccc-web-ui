import React from "react"
import { Flex, Button, Box } from '@chakra-ui/react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'

import Layout from "../components/Layout"



export default function CheckoutScreen() {

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async ( event ) => {
    // Block native form submission.
    event.preventDefault()

    if ( !stripe || !elements ) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement( CardElement )

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod( {
      type: 'card',
      card: cardElement,
    } )

    if ( error ) {
      console.log( '[error]', error )
    } else {
      console.log( '[PaymentMethod]', paymentMethod )
    }
  }

  return (
    <Layout>
      <Box p={8} minWidth="500px" minHeight="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <form style={{ width :'100%', height: '100%' }} onSubmit={handleSubmit}>
        <CardElement />
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
      </Box>
    </Layout>
  )
}
