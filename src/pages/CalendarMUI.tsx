/**
 * Calendar Page with Material UI
 */
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function CalendarMUI() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Calendar
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        View and manage your schedule
      </Typography>
      
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid', borderColor: 'grey.200' }}>
        <Typography variant="h6" color="text.secondary">
          Calendar view coming soon...
        </Typography>
      </Paper>
    </Box>
  );
}