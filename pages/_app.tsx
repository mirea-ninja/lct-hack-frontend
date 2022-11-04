import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiClientContextProvider } from "../logic/ApiClientHook";
import { NextPage } from "next";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ApiClientContextProvider>
          <Component {...pageProps} />
        </ApiClientContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const commonTheme = createTheme({
  status: {
    danger: orange[500],
  },
  background: {
    primary: "#F7F8FA",
  },
  text: {
    primary: "#3E3E41",
    secondary: "#A6A8B5",
    light: "#FFFFFF",
  },
  palette: {
    primary: {
      main: "#038CD2",
      darker: "#00699e",
    },
    secondary: {
      main: "#A6A8B5",
      light: "#DFE1E3",
      dark: "#A6A8B5",
    },
    accent: {
      main: "#c5ecff",
      color: "#038CD2",
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
});

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
              color: commonTheme.text.light,
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
          {
            props: { variant: "accentActive" },
            style: {
              backgroundColor: commonTheme.palette.accent.light,
              color: commonTheme.palette.accent.color,
              fontWeight: "500",
            },
          },
        ],
      },
    },
  },
  commonTheme
);

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    mainActive: true;
    mainDisabled: true;
    accentActive: true;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
    text: {
      primary: string;
      secondary: string;
      light: string;
    };
    background: {
      primary: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
    text?: {
      primary?: string;
      secondary?: string;
      light?: string;
    };
    background?: {
      primary?: string;
    };
  }

  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent: PaletteOptions["primary"] & AdditionalPanelOptions;
  }

  interface PaletteColor {
    darker?: string;
    color?: string;
  }

  interface AdditionalPanelOptions {
    color?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}
