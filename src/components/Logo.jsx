import React from 'react'
import { Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import LogoSrc from '../assets/images/logo.png'

export default function Logo( props ) {
  return (
    <Link to="/home">
      <Image 
        src={LogoSrc}
        alt="CCC Logo"
        htmlWidth="75px"
        // fallbackSrc="https://via.placeholder.com/120"
        />
    </Link>
  )
}
