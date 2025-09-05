/**
 * Settings Page with Material UI
 */
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { useAuthStore } from '@/stores/auth';

export default function SettingsMUI() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [emailUpdates, setEmailUpdates] = React.useState(true);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your account settings and preferences
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Profile Settings
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Avatar
                src={user?.avatar}
                sx={{ width: 80, height: 80, mr: 3 }}
              >
                {user?.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Profile Picture
                </Typography>
                <IconButton color="primary" component="label">
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  defaultValue={user?.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={user?.email}
                  variant="outlined"
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue="+1 234 567 8900"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  defaultValue="Engineering"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  defaultValue="Senior developer with expertise in full-stack development"
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" startIcon={<Save />}>
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'grey.200', mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Preferences
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                }
                label="Push Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={emailUpdates}
                    onChange={(e) => setEmailUpdates(e.target.checked)}
                  />
                }
                label="Email Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                  />
                }
                label="Dark Mode"
              />
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Security
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
              Change Password
            </Button>
            <Button variant="outlined" fullWidth color="error">
              Delete Account
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}