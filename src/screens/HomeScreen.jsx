import React from 'react'

import { useAirtable } from '../airtable/AirtableApp'
import Hero from '../components/Hero'
import Layout from '../components/Layout'

export default function HomeScreen() {

  const { user : airtableUser } = useAirtable()
  const firstName = airtableUser?.['First Name']

  const welcomeText = firstName ? `Welcome Home, ${firstName}` : 'Welcome Home'

  return (
    <Layout>
      <Hero
        title={welcomeText}
        subtitle="Activate Your Dreams Consciously, Creatively, and Collectively"
        image="https://uploads-ssl.webflow.com/5fef5d1affc655dba0eb54e9/6007753cb1b31549c08463f8_siena_reduced%20(1)-p-1600.jpeg"
        ctaText="Book Your Spot"
        ctaLink="/booking"
      />
    </Layout>
  )
}
