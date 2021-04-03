import { extendTheme } from "@chakra-ui/react"

const colors = {
  primary: {
    100: "#EFF4FE",
    200: "#D4DEF8",
    300: "#94AEED",
    400: "#758CE0",
    500: "#6175DF",
    600: "#485EC5",
    700: "#3646A4",
    800: "#253586",
    900: "#1F2C6D",
  },
  neutral : {
    100: "#F9F9FA",
    200: "#E1E7EC",
    300: "#E6E6E6",
    400: "#CCD4DB",
    500: "#AEBECD",
    600: "#929FB1",
    700: "#576575",
    800: "#404B5A",
    900: "#202833",
  },
  accents : {
    100: "#EFF8FF",
    200: "#AAD4F5",
    500: "#64A2D8",
    600: "#3282C8",
    700: "#2468A2",
    800: "#194971",
    900: "#E0C8FF",
  },
  success : '#06d6a0',
  warning : '#f6bd60',
  error : '#e63946',
}

const customTheme = extendTheme( { colors } )

export default customTheme
