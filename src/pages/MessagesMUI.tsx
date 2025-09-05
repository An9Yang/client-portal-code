/**
 * Messages Page with Material UI
 */
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, Send } from '@mui/icons-material';

const messages = [
  {
    id: 1,
    sender: 'Alex Johnson',
    avatar: 'AJ',
    message: 'Hey, can you review the latest designs?',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: 2,
    sender: 'Sarah Wilson',
    avatar: 'SW',
    message: 'The API integration is complete',
    time: '9:45 AM',
    unread: true,
  },
  {
    id: 3,
    sender: 'Michael Chen',
    avatar: 'MC',
    message: 'Meeting scheduled for tomorrow at 2 PM',
    time: 'Yesterday',
    unread: false,
  },
];

export default function MessagesMUI() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Messages
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Communication with your team
      </Typography>

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200', height: 600 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
          <TextField
            fullWidth
            placeholder="Search messages..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <List sx={{ p: 0 }}>
          {messages.map((msg, index) => (
            <React.Fragment key={msg.id}>
              <ListItem alignItems="flex-start" sx={{ py: 2, '&:hover': { bgcolor: 'grey.50' } }}>
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    variant="dot"
                    color="success"
                    invisible={!msg.unread}
                  >
                    <Avatar>{msg.avatar}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2" fontWeight={msg.unread ? 600 : 400}>
                        {msg.sender}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {msg.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color={msg.unread ? 'text.primary' : 'text.secondary'}
                      sx={{ fontWeight: msg.unread ? 500 : 400 }}
                    >
                      {msg.message}
                    </Typography>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}