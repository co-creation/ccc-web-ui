import { extendTheme } from '@chakra-ui/react'

const colors = {
  primary: {
    100: '#FAA307',
    200: '#FAA307',
    300: '#FAA307',
    400: '#FAA307',
    500: '#FAA307',
    600: '#F19A00',
    700: '#F19A00',
    800: '#F19A00',
    900: '#F19A00',
  },
  secondary: {
    50: '#DDF8F8',
    100: '#BAF2F2',
    500: '#44B9B9',
    700: '#1D9A9A',
  },
  base: {
    25: '#F9FAFB',
    50: '#F3F5F6',
    100: '#E7EAEF',
    200: '#CED6DE',
    300: '#ACB7C3',
    400: '#95A2B2',
    500: '#67798E',
    600: '#495A6E',
    700: '#394756',
    800: '#29323D',
    900: '#181E25',
  },
  success: {
    100: '#E7EAEF',
    500: '#67798E',
    700: '#394756',
  },
  danger: {
    50: '#FFEBED',
    100: '#FDD8DD',
    500: '#D84652',
    700: '#AA2A30',
    900: '#65171C',
  },
}

const fonts = {
    heading: "Poppins",
    body: "Poppins",
}

const customTheme = extendTheme( { colors, fonts } )

export default customTheme
