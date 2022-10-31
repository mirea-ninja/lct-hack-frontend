import "../styles/globals.scss"
import type { AppProps } from "next/app"
import { createTheme, ThemeProvider } from "@mui/material"
import { blue, orange } from "@mui/material/colors"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

const commonTheme = createTheme({
  status: {
    danger: orange[500],
  },
  text: {
    primary: "#000000",
    secondary: "#FFFFFF",
    light: "#FFFFFF",
  },
  palette: {
    primary: {
      main: "#1976d2",
      darker: "#145a9f",
    },
    secondary: {
      main: "#A6A8B5",
      light: "#DFE1E3",
      dark: "#A6A8B5",
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
})

const theme = createTheme(
  {
    components: {
      MuiInputBase: {
        defaultProps: {
          inputProps: {
            style: {
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "500",
            },
          },
          sx: {
            borderRadius: "10px",
            borderWidth: "30px",
            borderColor: commonTheme.palette.secondary.light,
          },
        },
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "mainActive" },
            style: {
              backgroundColor: commonTheme.palette.primary.main,
              color: commonTheme.text.secondary,
              fontWeight: "500",
              "&:hover": {
                backgroundColor: commonTheme.palette.primary.darker,
              },
            },
          },
          {
            props: { variant: "mainDisabled" },
            style: {
              backgroundColor: commonTheme.palette.secondary.light,
              color: commonTheme.palette.secondary.dark,
              fontWeight: "500",
              "&:hover": {
                backgroundColor: commonTheme.palette.secondary.light,
              },
            },
          },
        ],
      },
    },
  },
  commonTheme
)

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    mainActive: true
    mainDisabled: true
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string
    }
    text: {
      primary: string
      secondary: string
      light: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
    text?: {
      primary?: string
      secondary?: string
      light?: string
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
