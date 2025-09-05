/**
 * Tasks Page with Material UI
 */
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Grid,
} from '@mui/material';
import { Add, MoreVert, CalendarToday, Flag } from '@mui/icons-material';

const tasks = [
  {
    id: 1,
    title: 'Update project documentation',
    priority: 'High',
    assignee: { name: 'Alex Johnson', avatar: 'AJ' },
    dueDate: '2024-01-15',
    completed: false,
    project: 'E-commerce Platform',
  },
  {
    id: 2,
    title: 'Review pull requests',
    priority: 'Medium',
    assignee: { name: 'Sarah Wilson', avatar: 'SW' },
    dueDate: '2024-01-14',
    completed: true,
    project: 'Mobile App',
  },
  {
    id: 3,
    title: 'Client presentation preparation',
    priority: 'High',
    assignee: { name: 'Michael Chen', avatar: 'MC' },
    dueDate: '2024-01-16',
    completed: false,
    project: 'Marketing Website',
  },
];

export default function TasksMUI() {
  const [checked, setChecked] = React.useState<number[]>([2]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Tasks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your tasks and assignments
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 1 }}>
          New Task
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200' }}>
            <List sx={{ p: 0 }}>
              {tasks.map((task, index) => (
                <ListItem
                  key={task.id}
                  sx={{
                    borderBottom: index < tasks.length - 1 ? '1px solid' : 'none',
                    borderColor: 'grey.200',
                    py: 2,
                  }}
                  secondaryAction={
                    <IconButton edge="end">
                      <MoreVert />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(task.id) !== -1}
                      onChange={handleToggle(task.id)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'text.secondary' : 'text.primary',
                          }}
                        >
                          {task.title}
                        </Typography>
                        <Chip
                          label={task.priority}
                          size="small"
                          color={task.priority === 'High' ? 'error' : 'warning'}
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                            {task.assignee.avatar}
                          </Avatar>
                          <Typography variant="caption">{task.assignee.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarToday sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{task.dueDate}</Typography>
                        </Box>
                        <Chip label={task.project} size="small" variant="outlined" sx={{ height: 20 }} />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Task Statistics
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Completed</Typography>
                  <Typography variant="body2" fontWeight={600}>8/12</Typography>
                </Box>
                <LinearProgress variant="determinate" value={66} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">High Priority</Typography>
                <Typography variant="body2" fontWeight={600}>3</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Due Today</Typography>
                <Typography variant="body2" fontWeight={600}>2</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Overdue</Typography>
                <Typography variant="body2" fontWeight={600} color="error">1</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}