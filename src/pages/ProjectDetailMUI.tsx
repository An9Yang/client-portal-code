/**
 * Project Detail Page with Material UI
 */
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectDetailMUI() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/projects')}
        sx={{ mb: 3 }}
      >
        Back to Projects
      </Button>
      <Typography variant="h4" fontWeight={700}>
        Project Details #{id}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Project detail page coming soon...
      </Typography>
    </Box>
  );
}