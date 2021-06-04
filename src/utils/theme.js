import { extendTheme } from '@chakra-ui/react'

/**
 * @see {@link https://chakra-ui.com/docs/theming/customize-theme}
 */

const colors = {
  primary: {
    25: '#FFE3C2',
    50: '#FFD4A1',
    100: '#FFC685',
    200: '#FFB765',
    300: '#FFAF53',
    400: '#FDA72C',
    500: '#FAA307',
    600: '#F2A11C',
    700: '#F79B03',
    800: '#F59300',
    900: '#E38800',
  },
  secondary: {
    50: '#F5FAF8',
    100: '#DFEAE6',
    500: '#7AA996',
    700: '#628C7B',
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
  heading: 'Poppins',
  body: 'Poppins',
}

const customTheme = extendTheme( {
  styles: { fonts },
  colors,
  fonts,
} )

export default customTheme
