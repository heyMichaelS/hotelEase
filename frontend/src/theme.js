import { createTheme } from '@mui/material/styles';

const hotelTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#BC7C8F' },
    secondary: { main: '#D8A7B1' },
    background: {
      default: '#F4F4F5',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#6B7280'
    },
    error: { main: '#E57373' },
    warning: { main: '#F4A261' },
    info: { main: '#A3B5C9' },
    success: { main: '#8DB596' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none' },
  },
  components: {
    MuiPaper: {
      styleOverrides: { root: { borderRadius: 12 } },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 12, fontWeight: 500 } },
    },
  },
});

export default hotelTheme;
