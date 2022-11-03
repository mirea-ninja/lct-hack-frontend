import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, orange } from "@mui/material/colors";
import { Box } from "@mui/system";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        padding={0}
        sx={{
          backgroundColor: theme.background.primary,
        }}
      >
        <Component {...pageProps} />
      </Box>
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
