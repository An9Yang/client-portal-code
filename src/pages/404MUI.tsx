/**
 * 404 Not Found Page with Material UI
 */
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundMUI() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { xs: '6rem', md: '8rem' },
          fontWeight: 800,
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        startIcon={<Home />}
        onClick={() => navigate('/dashboard')}
        sx={{
          bgcolor: 'white',
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'grey.100',
          },
        }}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}