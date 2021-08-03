import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
      fontFamily: 'Aglet Sans, Haguro',
      h1: {
        fontFamily: 'Haguro',
        fontSize: '38px',
        lineHeight: '34px',
        marginBlockStart: '-19px',
      },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 800,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
  });