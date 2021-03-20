import React from "react"

import Hero from "../components/Hero"
import LandingLayout from "../components/Layout"

export default function HomeScreen() {
  return (
    <LandingLayout>
      <Hero
        title="Welcome to The Co-Creation Castle"
        subtitle="Join other young, creative adults from diverse backgrounds to co-create lives of wellbeing."
        image="https://uploads-ssl.webflow.com/5fef5d1affc655dba0eb54e9/6007753cb1b31549c08463f8_siena_reduced%20(1)-p-1600.jpeg"
        ctaText="Book Accomodation"
        ctaLink="/book"
      />
    </LandingLayout>
  )
}
