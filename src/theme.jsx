import { createTheme } from '@mui/material/styles';

const primaryColor = '#8A5CFF';
const secondaryColor = '#FFC107'; // Using a complementary yellow/amber for highlights (from the logo)
const backgroundColor = '#1A237E'; // Darker blue for background contrast

export const customTheme = createTheme({
  palette: {
    mode: 'light', // We use light mode, but with a strong, deep primary color
    primary: {
      main: primaryColor,
      light: '#A380FF',
      dark: '#6D44CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#000000',
    },
    background: {
      default: '#f4f6f8', // Light background for the main content area
      paper: '#ffffff',
    },
    // Custom background for the dashboard container (matching the original image vibe)
    deepBackground: {
      main: backgroundColor,
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: backgroundColor, // Deep blue sidebar
                color: '#ffffff',
            }
        }
    }
  }
});