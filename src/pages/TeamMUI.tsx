/**
 * Team Page with Material UI
 */
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import {
  Email,
  Phone,
  MoreVert,
  Add,
} from '@mui/icons-material';

const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Project Manager',
    email: 'alex@company.com',
    phone: '+1 234-567-8901',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    projects: 5,
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    role: 'Lead Developer',
    email: 'sarah@company.com',
    phone: '+1 234-567-8902',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    projects: 3,
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'UX Designer',
    email: 'michael@company.com',
    phone: '+1 234-567-8903',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'away',
    projects: 4,
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    role: 'Frontend Developer',
    email: 'emma@company.com',
    phone: '+1 234-567-8904',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'offline',
    projects: 2,
  },
];

export default function TeamMUI() {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Team Members
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Collaborate with your team
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Add Member
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} md={6} lg={3} key={member.id}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 80, height: 80, margin: '0 auto' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 5,
                      right: 5,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      border: '2px solid white',
                      bgcolor: member.status === 'online' ? 'success.main' : 
                              member.status === 'away' ? 'warning.main' : 'grey.400',
                    }}
                  />
                </Box>
                
                <Typography variant="h6" fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {member.role}
                </Typography>
                
                <Chip 
                  label={`${member.projects} Projects`}
                  size="small"
                  sx={{ mt: 1, mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton size="small" color="primary">
                    <Email />
                  </IconButton>
                  <IconButton size="small" color="primary">
                    <Phone />
                  </IconButton>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}