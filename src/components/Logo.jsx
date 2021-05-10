import React from 'react'
import { Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import LogoSrc from '../assets/images/logo.png'

export default function Logo() {
  return (
    <Link to="/home">
      <Image
        src={LogoSrc}
        alt="CCC Logo"
        htmlWidth="75px"
      />
    </Link>
  )
}
