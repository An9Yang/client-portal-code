/**
 * Dashboard Page with Material UI
 * Organized layout with clear sections for stats and analytics
 */
import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Chip,
  Avatar,
  AvatarGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme,
  alpha,
  Container,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  AttachMoney,
  People,
  Assignment,
  CheckCircle,
  Schedule,
  Warning,
  East,
  AccountBalance,
  ShoppingCart,
  TrendingFlat,
} from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, trend = 'neutral' }) => {
  const theme = useTheme();
  const isPositive = change >= 0;
  
  const getTrendColor = () => {
    if (trend === 'up') return theme.palette.success.main;
    if (trend === 'down') return theme.palette.error.main;
    return theme.palette.grey[500];
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[3],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 500,
                fontSize: '0.7rem',
              }}
            >
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
              {value}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {trend === 'up' && <ArrowUpward sx={{ fontSize: 16, color: getTrendColor() }} />}
            {trend === 'down' && <ArrowDownward sx={{ fontSize: 16, color: getTrendColor() }} />}
            {trend === 'neutral' && <TrendingFlat sx={{ fontSize: 16, color: getTrendColor() }} />}
            <Typography
              variant="body2"
              sx={{ 
                ml: 0.5,
                color: getTrendColor(),
                fontWeight: 600,
              }}
            >
              {Math.abs(change)}%
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const projects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    client: 'TechCorp Inc.',
    status: 'In Progress',
    progress: 65,
    team: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop',
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop',
    ],
    deadline: '2024-03-15',
    budget: '$85,000',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'StartupXYZ',
    status: 'Planning',
    progress: 25,
    team: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop',
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=32&h=32&fit=crop',
    ],
    deadline: '2024-04-01',
    budget: '$50,000',
  },
  {
    id: 3,
    name: 'Marketing Website',
    client: 'Agency Pro',
    status: 'Completed',
    progress: 100,
    team: [
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=32&h=32&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop',
    ],
    deadline: '2024-02-28',
    budget: '$25,000',
  },
];

const activities = [
  { id: 1, user: 'Alex Johnson', action: 'completed task', target: 'Homepage redesign', time: '2 hours ago', avatar: 'AJ' },
  { id: 2, user: 'Sarah Wilson', action: 'commented on', target: 'API Integration', time: '3 hours ago', avatar: 'SW' },
  { id: 3, user: 'Michael Chen', action: 'uploaded', target: 'Design mockups', time: '5 hours ago', avatar: 'MC' },
  { id: 4, user: 'Emma Rodriguez', action: 'started', target: 'User testing', time: '1 day ago', avatar: 'ER' },
];

export default function DashboardMUI() {
  const theme = useTheme();

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [30000, 35000, 32000, 40000, 45000, 50000],
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 15, 25, 22, 30, 18],
        backgroundColor: alpha(theme.palette.primary.main, 0.7),
        borderRadius: 6,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Completed', 'In Progress', 'Planning', 'On Hold'],
    datasets: [
      {
        data: [45, 30, 20, 5],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.grey[300],
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        bodyFont: {
          size: 13,
        },
        titleFont: {
          size: 14,
          weight: 600,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          borderDash: [3, 3],
          color: 'rgba(0, 0, 0, 0.06)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your projects today.
        </Typography>
      </Box>

      {/* Key Metrics Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Key Metrics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value="$45,231"
              change={12.5}
              icon={<AccountBalance />}
              trend="up"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Projects"
              value="12"
              change={-4.3}
              icon={<Assignment />}
              trend="down"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Team Members"
              value="24"
              change={8.2}
              icon={<People />}
              trend="up"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tasks Completed"
              value="142"
              change={23.1}
              icon={<CheckCircle />}
              trend="up"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Analytics Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Analytics & Reports
        </Typography>
        <Grid container spacing={3}>
          {/* Revenue Chart */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: 400,
                background: '#ffffff',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Revenue Trend
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly revenue for the last 6 months
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Box sx={{ height: 300 }}>
                <Line data={lineChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* Project Status */}
          <Grid item xs={12} lg={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                height: 400,
                background: '#ffffff',
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>
                  Project Distribution
                </Typography>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Box sx={{ height: 200, mb: 3 }}>
                <Doughnut data={doughnutChartData} options={{ ...chartOptions, maintainAspectRatio: true }} />
              </Box>
              <Grid container spacing={2}>
                {doughnutChartData.labels.map((label, index) => (
                  <Grid item xs={6} key={label}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: doughnutChartData.datasets[0].backgroundColor[index],
                          mr: 1,
                        }}
                      />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {label}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {doughnutChartData.datasets[0].data[index]}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Projects Table */}
      <Box sx={{ mb: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            background: '#ffffff',
            border: '1px solid',
            borderColor: 'grey.200',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={600}>
                Active Projects
              </Typography>
              <Button 
                variant="text"
                endIcon={<East />} 
                size="small"
                sx={{ color: 'primary.main' }}
              >
                View All Projects
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Deadline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {project.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {project.client}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.status}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          backgroundColor: 
                            project.status === 'Completed'
                              ? alpha(theme.palette.success.main, 0.1)
                              : project.status === 'In Progress'
                              ? alpha(theme.palette.info.main, 0.1)
                              : alpha(theme.palette.warning.main, 0.1),
                          color:
                            project.status === 'Completed'
                              ? theme.palette.success.main
                              : project.status === 'In Progress'
                              ? theme.palette.info.main
                              : theme.palette.warning.main,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            sx={{ 
                              height: 5, 
                              borderRadius: 3,
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            }}
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 35 }}>
                          {project.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <AvatarGroup max={3} sx={{ justifyContent: 'flex-start' }}>
                        {project.team.map((avatar, index) => (
                          <Avatar 
                            key={index} 
                            src={avatar} 
                            sx={{ 
                              width: 28, 
                              height: 28,
                              border: '2px solid white',
                            }} 
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {project.budget}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Schedule sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2">{project.deadline}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        {/* Task Performance */}
        <Grid item xs={12} lg={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: 350,
              background: '#ffffff',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Weekly Performance
              </Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ height: 250 }}>
              <Bar data={barChartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} lg={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: 350,
              background: '#ffffff',
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Recent Activities
              </Typography>
              <Button variant="text" size="small">
                View All
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {activities.map((activity) => (
                <Box key={activity.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      bgcolor: 'primary.main',
                      fontSize: '0.875rem',
                    }}
                  >
                    {activity.avatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        {activity.user}
                      </Box>{' '}
                      {activity.action}{' '}
                      <Box component="span" fontWeight={600}>
                        {activity.target}
                      </Box>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}