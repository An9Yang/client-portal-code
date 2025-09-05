import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Grid,
  Chip,
  Avatar,
  Stack,
  Divider,
  Paper,
  Fade,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
  Person,
  AdminPanelSettings,
  Business,
  Group,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useAuthStore } from '@/stores/auth';
import { client } from '@/lib/api';

interface DemoAccount {
  id: string;
  email: string;
  name: string;
  role: string;
  demoPassword: string;
}

export default function LoginMUI() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoAccounts, setDemoAccounts] = useState<DemoAccount[]>([]);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const login = useAuthStore(state => state.login);

  useEffect(() => {
    loadDemoAccounts();
  }, []);

  const loadDemoAccounts = async () => {
    try {
      const response = await client.api.auth['demo-accounts'].$get();
      if (response.ok) {
        const data = await response.json();
        setDemoAccounts(data.accounts);
        setShowDemoAccounts(true);
      }
    } catch (error) {
      console.error('Failed to load demo accounts:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, rememberMe);
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/dashboard');
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Login failed. Please check your credentials.', { 
        variant: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (account: DemoAccount) => {
    setEmail(account.email);
    setPassword(account.demoPassword);
    enqueueSnackbar(`Demo account filled: ${account.name}`, { variant: 'info' });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'agency_admin':
        return <AdminPanelSettings />;
      case 'agency_member':
        return <Business />;
      case 'client_admin':
        return <Person />;
      case 'client_member':
        return <Group />;
      default:
        return <Person />;
    }
  };

  const getRoleColor = (role: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    const colors: Record<string, any> = {
      agency_admin: 'primary',
      agency_member: 'info',
      client_admin: 'success',
      client_member: 'default'
    };
    return colors[role] || 'default';
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      agency_admin: 'Agency Admin',
      agency_member: 'Agency Member',
      client_admin: 'Client Admin',
      client_member: 'Client Member'
    };
    return labels[role] || role;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'move 20s linear infinite',
          '@keyframes move': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(50px, 50px)' },
          },
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  color="white"
                  gutterBottom
                  sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="h5"
                  color="white"
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)' 
                  }}
                >
                  Your Client Portal for Project Excellence
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <Chip
                    icon={<Business />}
                    label="Enterprise Ready"
                    sx={{ 
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                  <Chip
                    icon={<Group />}
                    label="Team Collaboration"
                    sx={{ 
                      bgcolor: alpha(theme.palette.common.white, 0.2),
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                </Stack>
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in timeout={1500}>
              <Card
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  backgroundColor: alpha(theme.palette.background.paper, 0.98),
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      Sign In
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter your credentials to access your account
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Remember me"
                      sx={{ mb: 3 }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={<LoginIcon />}
                      sx={{
                        mb: 3,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                        boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                        },
                      }}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>

                  {showDemoAccounts && demoAccounts.length > 0 && (
                    <>
                      <Divider sx={{ my: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                          DEMO ACCOUNTS
                        </Typography>
                      </Divider>

                      <Grid container spacing={2}>
                        {demoAccounts.map((account) => (
                          <Grid item xs={12} sm={6} key={account.id}>
                            <Paper
                              variant="outlined"
                              sx={{
                                p: 2,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                '&:hover': {
                                  borderColor: theme.palette.primary.main,
                                  boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                                  transform: 'translateY(-2px)',
                                },
                              }}
                              onClick={() => fillDemoAccount(account)}
                            >
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar
                                  src={account.avatar}
                                  alt={account.name}
                                  sx={{ width: 40, height: 40 }}
                                />
                                <Box flex={1}>
                                  <Typography variant="subtitle2" fontWeight="600">
                                    {account.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {account.email}
                                  </Typography>
                                  <Box sx={{ mt: 0.5 }}>
                                    <Chip
                                      size="small"
                                      icon={getRoleIcon(account.role)}
                                      label={getRoleLabel(account.role)}
                                      color={getRoleColor(account.role)}
                                      sx={{ height: 20, fontSize: '0.7rem' }}
                                    />
                                  </Box>
                                </Box>
                              </Stack>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>

                      <Alert severity="info" sx={{ mt: 2 }}>
                        <Typography variant="caption">
                          Click any demo account to auto-fill credentials. Password: password123
                        </Typography>
                      </Alert>
                    </>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}