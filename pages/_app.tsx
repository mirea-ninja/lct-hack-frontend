import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { createTheme, ThemeProvider } from "@mui/material"
import { orange } from "@mui/material/colors"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

const theme = createTheme({
  status: {
    danger: orange[500],
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#A6A8B5",
    },
    accent: {
      main: "#E5F3FA",
      light: "#E5F3FA",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
      textTransform: "none",
    },
  },
})

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }

  interface Palette {
    accent: Palette["primary"]
  }
  interface PaletteOptions {
    accent: PaletteOptions["primary"]
  }

  interface PaletteColor {
    darker?: string
  }
  interface SimplePaletteColorOptions {
    darker?: string
  }
}
