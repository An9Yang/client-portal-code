import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C3E50', // Sophisticated dark blue-gray
      light: '#34495E',
      dark: '#1A252F',
      contrastText: '#fff',
    },
    secondary: {
      main: '#16A085', // Elegant teal
      light: '#1ABC9C',
      dark: '#0E6655',
      contrastText: '#fff',
    },
    background: {
      default: '#F8F9FA',
      paper: '#ffffff',
    },
    success: {
      main: '#27AE60',
      light: '#2ECC71',
      dark: '#229954',
    },
    error: {
      main: '#E74C3C',
      light: '#EC7063',
      dark: '#C0392B',
    },
    warning: {
      main: '#F39C12',
      light: '#F1C40F',
      dark: '#D68910',
    },
    info: {
      main: '#3498DB',
      light: '#5DADE2',
      dark: '#2874A6',
    },
    grey: {
      50: '#F8F9FA',
      100: '#E9ECEF',
      200: '#DEE2E6',
      300: '#CED4DA',
      400: '#ADB5BD',
      500: '#6C757D',
      600: '#495057',
      700: '#343A40',
      800: '#212529',
      900: '#0F1419',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '0.95rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0,0,0,0.05)',
    '0 1px 3px 0 rgba(0,0,0,0.1)',
    '0 4px 6px -1px rgba(0,0,0,0.1)',
    '0 10px 15px -3px rgba(0,0,0,0.1)',
    '0 20px 25px -5px rgba(0,0,0,0.1)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
    '0 25px 50px -12px rgba(0,0,0,0.25)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          background: '#2C3E50',
          '&:hover': {
            background: '#1A252F',
          },
        },
        outlinedPrimary: {
          borderColor: '#DEE2E6',
          color: '#2C3E50',
          '&:hover': {
            borderColor: '#2C3E50',
            backgroundColor: 'rgba(44, 62, 80, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
          border: '1px solid #E9ECEF',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: '#DEE2E6',
            },
            '&:hover fieldset': {
              borderColor: '#ADB5BD',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2C3E50',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
        },
        elevation0: {
          border: '1px solid #E9ECEF',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #E9ECEF',
          backgroundColor: '#ffffff',
          color: '#2C3E50',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          boxShadow: 'none',
          borderRight: '1px solid #E9ECEF',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem',
        },
        colorPrimary: {
          backgroundColor: 'rgba(44, 62, 80, 0.12)',
          color: '#2C3E50',
        },
        colorSuccess: {
          backgroundColor: 'rgba(39, 174, 96, 0.12)',
          color: '#27AE60',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.875rem',
          backgroundColor: '#34495E',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          marginBottom: 2,
          '&.Mui-selected': {
            backgroundColor: 'rgba(44, 62, 80, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(44, 62, 80, 0.12)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(44, 62, 80, 0.04)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#E9ECEF',
        },
        barColorPrimary: {
          borderRadius: 4,
          backgroundColor: '#2C3E50',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F8F9FA',
          fontWeight: 600,
          color: '#495057',
          borderBottom: '2px solid #DEE2E6',
        },
        root: {
          borderBottom: '1px solid #E9ECEF',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});