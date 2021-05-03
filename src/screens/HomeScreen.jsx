import React from 'react'

import { useAirtable } from '../airtable/AirtableApp'
import Hero from '../components/Hero'
import Layout from '../components/Layout'

import imageSrc from "../assets/images/heroimage.jpeg"

export default function HomeScreen() {

  const { user : airtableUser } = useAirtable()
  const firstName = airtableUser?.['First Name']

  const welcomeText = firstName ? `Welcome Home, ${firstName}` : 'Welcome Home'

  return (
    <Layout>
      <Hero
        title={welcomeText}
        subtitle="Activate Your Dreams Consciously, Creatively, and Collectively"
        image={imageSrc}
        ctaText="Book Your Spot"
        ctaLink="/booking"
      />
    </Layout>
  )
}
