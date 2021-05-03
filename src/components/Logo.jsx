import React from "react"
import { Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function Logo( props ) {
  return (
    <Link to="/home">
      <Image 
        src="https://uploads-ssl.webflow.com/5fef5d1affc655dba0eb54e9/608b5f78e5e4d703e6f4d46b_Logo%20Full.png" 
        alt="CCC Logo"
        htmlHeight="75px"
        htmlWidth="120px"
        // fallbackSrc="https://via.placeholder.com/120"
        />
    </Link>
  )
}
