import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Badge,
  Button,
  Typography,
  Divider
} from '@arco-design/web-react';
import {
  IconHome,
  IconApps,
  IconUser,
  IconNotification,
  IconPoweroff,
  IconSettings,
  IconSun,
  IconMoon
} from '@arco-design/web-react/icon';
import { useAuthStore } from '@/stores/auth';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        <IconUser /> My Profile
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate('/settings')}>
        <IconSettings /> Settings
      </Menu.Item>
      <Divider style={{ margin: '8px 0' }} />
      <Menu.Item key="logout" onClick={handleLogout}>
        <IconPoweroff /> Logout
      </Menu.Item>
    </Menu>
  );

  const selectedKeys = [location.pathname];

  return (
    <Layout className="arco-layout">
      <Sider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsible
        width={240}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #e5e6eb'
        }}>
          {!collapsed ? (
            <Text style={{ fontSize: 18, fontWeight: 600, color: '#165DFF' }}>
              Client Portal Pro
            </Text>
          ) : (
            <Text style={{ fontSize: 18, fontWeight: 600, color: '#165DFF' }}>
              CP
            </Text>
          )}
        </div>
        <Menu
          selectedKeys={selectedKeys}
          onClickMenuItem={handleMenuClick}
          style={{ marginTop: 16 }}
        >
          <Menu.Item key="/dashboard">
            <IconHome /> Dashboard
          </Menu.Item>
          <Menu.Item key="/projects">
            <IconApps /> Projects
          </Menu.Item>
          <Menu.Item key="/team">
            <IconUser /> Team
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout>
        <Header className="dashboard-header" style={{
          padding: '0 24px',
          height: 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>
              Welcome back, {user?.name || 'User'}
            </Text>
          </div>
          
          <Space size="medium">
            <Button
              shape="circle"
              icon={theme === 'light' ? <IconMoon /> : <IconSun />}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            
            <Badge count={3} dot>
              <Button shape="circle" icon={<IconNotification />} />
            </Badge>
            
            <Dropdown droplist={userMenu} position="br">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size={32} style={{ backgroundColor: '#165DFF' }}>
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <Text>{user?.name || 'User'}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{
          padding: 24,
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#f2f3f5'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}