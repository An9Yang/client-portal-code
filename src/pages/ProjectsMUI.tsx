/**
 * Projects Page with Material UI
 * Display and manage all projects
 */
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  LinearProgress,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  alpha,
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Add,
  FolderOpen,
  Schedule,
  AttachMoney,
  ArrowForward,
  Edit,
  Delete,
  Archive,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    client: 'TechCorp Inc.',
    description: 'Building a modern e-commerce platform with advanced features including AI-powered recommendations.',
    status: 'In Progress',
    priority: 'High',
    progress: 65,
    budget: 85000,
    spent: 55250,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    team: [
      { name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop' },
      { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop' },
      { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop' },
    ],
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'StartupXYZ',
    description: 'Cross-platform mobile application for iOS and Android with real-time features.',
    status: 'Planning',
    priority: 'Medium',
    progress: 25,
    budget: 50000,
    spent: 12500,
    startDate: '2024-02-01',
    endDate: '2024-04-01',
    team: [
      { name: 'Emma Rodriguez', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop' },
      { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=32&h=32&fit=crop' },
    ],
    tags: ['React Native', 'Firebase'],
  },
  {
    id: 3,
    name: 'Marketing Website',
    client: 'Agency Pro',
    description: 'Corporate website with CMS integration and SEO optimization.',
    status: 'Completed',
    priority: 'Low',
    progress: 100,
    budget: 25000,
    spent: 23500,
    startDate: '2024-01-01',
    endDate: '2024-02-28',
    team: [
      { name: 'Lisa Anderson', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop' },
      { name: 'Tom Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop' },
      { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop' },
    ],
    tags: ['WordPress', 'SEO', 'PHP'],
  },
  {
    id: 4,
    name: 'Data Analytics Dashboard',
    client: 'FinTech Solutions',
    description: 'Real-time data analytics dashboard with advanced visualization capabilities.',
    status: 'In Progress',
    priority: 'High',
    progress: 80,
    budget: 120000,
    spent: 96000,
    startDate: '2023-12-01',
    endDate: '2024-03-30',
    team: [
      { name: 'Robert Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop' },
      { name: 'Jennifer Lee', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop' },
      { name: 'Chris Evans', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop' },
      { name: 'Diana Prince', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop' },
    ],
    tags: ['Python', 'D3.js', 'PostgreSQL', 'Redis'],
  },
];

const statusColors: Record<string, any> = {
  'Completed': 'success',
  'In Progress': 'primary',
  'Planning': 'warning',
  'On Hold': 'default',
};

const priorityColors: Record<string, string> = {
  'High': '#f44336',
  'Medium': '#ff9800',
  'Low': '#4caf50',
};

export default function ProjectsMUI() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [projectMenuAnchor, setProjectMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [newProjectDialog, setNewProjectDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>, projectId: number) => {
    event.stopPropagation();
    setProjectMenuAnchor(event.currentTarget);
    setSelectedProject(projectId);
  };

  const handleProjectMenuClose = () => {
    setProjectMenuAnchor(null);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track all your projects
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setNewProjectDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          New Project
        </Button>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
        >
          Filter
        </Button>
      </Box>

      {/* Status Chips */}
      <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
        <Chip
          label="All"
          onClick={() => setStatusFilter('All')}
          color={statusFilter === 'All' ? 'primary' : 'default'}
          variant={statusFilter === 'All' ? 'filled' : 'outlined'}
        />
        <Chip
          label="In Progress"
          onClick={() => setStatusFilter('In Progress')}
          color={statusFilter === 'In Progress' ? 'primary' : 'default'}
          variant={statusFilter === 'In Progress' ? 'filled' : 'outlined'}
        />
        <Chip
          label="Planning"
          onClick={() => setStatusFilter('Planning')}
          color={statusFilter === 'Planning' ? 'primary' : 'default'}
          variant={statusFilter === 'Planning' ? 'filled' : 'outlined'}
        />
        <Chip
          label="Completed"
          onClick={() => setStatusFilter('Completed')}
          color={statusFilter === 'Completed' ? 'primary' : 'default'}
          variant={statusFilter === 'Completed' ? 'filled' : 'outlined'}
        />
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => handleProjectClick(project.id)}
            >
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={project.status}
                      size="small"
                      color={statusColors[project.status]}
                    />
                    <Chip
                      label={project.priority}
                      size="small"
                      sx={{
                        bgcolor: alpha(priorityColors[project.priority], 0.1),
                        color: priorityColors[project.priority],
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleProjectMenuOpen(e, project.id)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {project.client}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>

                {/* Progress */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {project.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={project.progress}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>

                {/* Budget */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoney sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2">
                    ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                  </Typography>
                </Box>

                {/* Timeline */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                  <Typography variant="body2">
                    {project.endDate}
                  </Typography>
                </Box>

                {/* Tags */}
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                  {project.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>

                {/* Team */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <AvatarGroup max={3}>
                    {project.team.map((member, index) => (
                      <Avatar
                        key={index}
                        src={member.avatar}
                        alt={member.name}
                        sx={{ width: 32, height: 32 }}
                      />
                    ))}
                  </AvatarGroup>
                  <IconButton size="small" color="primary">
                    <ArrowForward />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Project Menu */}
      <Menu
        anchorEl={projectMenuAnchor}
        open={Boolean(projectMenuAnchor)}
        onClose={handleProjectMenuClose}
      >
        <MenuItem onClick={handleProjectMenuClose}>
          <Edit sx={{ fontSize: 20, mr: 1 }} />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleProjectMenuClose}>
          <Archive sx={{ fontSize: 20, mr: 1 }} />
          Archive Project
        </MenuItem>
        <MenuItem onClick={handleProjectMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ fontSize: 20, mr: 1 }} />
          Delete Project
        </MenuItem>
      </Menu>

      {/* New Project Dialog */}
      <Dialog open={newProjectDialog} onClose={() => setNewProjectDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField label="Project Name" fullWidth />
            <TextField label="Client" fullWidth />
            <TextField label="Description" fullWidth multiline rows={3} />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select label="Priority">
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Budget" type="number" fullWidth />
            <TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewProjectDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setNewProjectDialog(false)}>
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}