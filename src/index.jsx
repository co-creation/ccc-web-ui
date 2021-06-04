import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'

import AppRoot from './AppRoot'
import * as serviceWorker from './serviceWorker'
import customTheme from './utils/theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <AppRoot />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById( 'root' ),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
