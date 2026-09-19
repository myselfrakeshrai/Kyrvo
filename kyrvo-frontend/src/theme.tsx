import { createTheme } from '@mui/material/styles';

// Create a Material-UI theme
const theme = (primary: string, secondary: string, tertiary: string, fontFamily:string) =>
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: primary || '#000',
      },
      secondary: {
        main: secondary || '#444',
      },
      tertiary: {
        main: tertiary || '#ffffff',
      },
      error: {
        main: '#f50057',
      },
      warning: {
        main: '#ffa000',
      },
      info: {
        main: '#0277bd',
      },
      success: {
        main: '#286f2c',
      },
    },

    typography: {
      fontFamily: fontFamily || 'Poppins',
      h1: {
        fontSize: '2.0rem',
        fontWeight: 600,
        marginBottom: '1rem',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 500,
        marginBottom: '0.75rem',
      },
      body1: {
        fontSize: '0.9rem',
        lineHeight: 1.6,
      },
      button: {
        textTransform: 'uppercase',
        fontSize: '0.9rem',
        fontWeight: 600,
      },
    },
  });

export default theme;
