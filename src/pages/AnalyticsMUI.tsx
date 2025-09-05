/**
 * Analytics Page with Material UI
 * Performance metrics and data visualization
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
  Button,
  useTheme,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  Download,
  CalendarToday,
  ArrowUpward,
  ArrowDownward,
  People,
  Visibility,
  Timer,
  Speed,
} from '@mui/icons-material';
import { Line, Bar, Radar, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PolarAreaController,
  RadarController,
} from 'chart.js';

// Register additional ChartJS components
ChartJS.register(RadialLinearScale, PolarAreaController, RadarController);

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  subtitle: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, subtitle }) => {
  const theme = useTheme();
  const isPositive = change >= 0;

  return (
    <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'grey.200' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
            }}
          >
            {icon}
          </Box>
          <Chip
            label={`${isPositive ? '+' : ''}${change}%`}
            size="small"
            sx={{
              backgroundColor: isPositive
                ? alpha(theme.palette.success.main, 0.1)
                : alpha(theme.palette.error.main, 0.1),
              color: isPositive ? theme.palette.success.main : theme.palette.error.main,
              fontWeight: 600,
            }}
            icon={isPositive ? <ArrowUpward sx={{ fontSize: 14 }} /> : <ArrowDownward sx={{ fontSize: 14 }} />}
          />
        </Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function AnalyticsMUI() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = React.useState('7d');

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Page Views',
        data: [12500, 15000, 14200, 16800, 18200, 17500, 19000],
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Unique Visitors',
        data: [8500, 9200, 8800, 10500, 11200, 10800, 12000],
        borderColor: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Other'],
    datasets: [
      {
        label: 'Users by Device',
        data: [45, 32, 15, 5, 3],
        backgroundColor: [
          alpha(theme.palette.primary.main, 0.8),
          alpha(theme.palette.secondary.main, 0.8),
          alpha(theme.palette.warning.main, 0.8),
          alpha(theme.palette.info.main, 0.8),
          alpha(theme.palette.grey[500], 0.8),
        ],
        borderRadius: 6,
      },
    ],
  };

  const radarChartData = {
    labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO', 'PWA'],
    datasets: [
      {
        label: 'Current',
        data: [95, 88, 92, 96, 78],
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        pointBackgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Previous',
        data: [88, 85, 88, 92, 70],
        borderColor: theme.palette.grey[400],
        backgroundColor: alpha(theme.palette.grey[400], 0.1),
        pointBackgroundColor: theme.palette.grey[400],
      },
    ],
  };

  const polarChartData = {
    labels: ['Direct', 'Organic', 'Social', 'Email', 'Referral'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          alpha(theme.palette.primary.main, 0.8),
          alpha(theme.palette.success.main, 0.8),
          alpha(theme.palette.info.main, 0.8),
          alpha(theme.palette.warning.main, 0.8),
          alpha(theme.palette.error.main, 0.8),
        ],
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
    },
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Analytics Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and analyze your application performance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              displayEmpty
              sx={{ backgroundColor: 'white' }}
            >
              <MenuItem value="24h">Last 24 hours</MenuItem>
              <MenuItem value="7d">Last 7 days</MenuItem>
              <MenuItem value="30d">Last 30 days</MenuItem>
              <MenuItem value="90d">Last 90 days</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Download />}
            sx={{ borderRadius: 1 }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Users"
            value="24,563"
            change={12.5}
            icon={<People />}
            subtitle="Active this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Page Views"
            value="152.3K"
            change={8.2}
            icon={<Visibility />}
            subtitle="Total views this week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Session"
            value="4m 32s"
            change={-3.4}
            icon={<Timer />}
            subtitle="Average duration"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Bounce Rate"
            value="32.5%"
            change={-5.2}
            icon={<Speed />}
            subtitle="Lower is better"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Traffic Overview */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} sx={{ p: 3, height: 400, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Traffic Overview
              </Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ height: 320 }}>
              <Line data={lineChartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Traffic Sources */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} sx={{ p: 3, height: 400, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Traffic Sources
              </Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ height: 320 }}>
              <PolarArea data={polarChartData} options={{ ...chartOptions, maintainAspectRatio: true }} />
            </Box>
          </Paper>
        </Grid>

        {/* Device Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, height: 350, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Device Distribution
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

        {/* Performance Score */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, height: 350, border: '1px solid', borderColor: 'grey.200' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Performance Score
              </Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <Box sx={{ height: 250 }}>
              <Radar data={radarChartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}