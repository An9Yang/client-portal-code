import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Space,
  Typography,
  Notification,
  Divider,
  Tag,
  Grid,
  Alert
} from '@arco-design/web-react';
import {
  IconUser,
  IconLock,
  IconEye,
  IconEyeInvisible
} from '@arco-design/web-react/icon';
import { useAuthStore } from '@/stores/auth';
import { client } from '@/lib/api';

const FormItem = Form.Item;
const { Title, Text } = Typography;
const { Row, Col } = Grid;

interface DemoAccount {
  id: string;
  email: string;
  name: string;
  role: string;
  demoPassword: string;
}

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
      }
    } catch (err) {
      console.error('Failed to load demo accounts:', err);
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await login(values.email, values.password, values.rememberMe);
      Notification.success({
        title: 'Success',
        content: 'Login successful!'
      });
      navigate('/dashboard');
    } catch (error: any) {
      Notification.error({
        title: 'Error', 
        content: error.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (account: DemoAccount) => {
    form.setFieldsValue({
      email: account.email,
      password: account.demoPassword
    });
    Notification.info({
      title: 'Demo Account',
      content: `Demo account filled: ${account.name}`
    });
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      agency_admin: 'purple',
      agency_member: 'blue',
      client_admin: 'green',
      client_member: 'gray'
    };
    return colors[role] || 'gray';
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
    <div className="login-container">
      <Card className="login-card" style={{ width: 420, padding: '32px 40px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title heading={2} style={{ marginBottom: 8 }}>
              Client Portal Pro
            </Title>
            <Text type="secondary">
              Secure collaboration platform for agencies and clients
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onSubmit={handleSubmit}
            size="large"
          >
            <FormItem
              field="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input
                prefix={<IconUser />}
                placeholder="you@company.com"
                allowClear
              />
            </FormItem>

            <FormItem
              field="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<IconLock />}
                placeholder="Enter your password"
              />
            </FormItem>

            <FormItem field="rememberMe" triggerPropName="checked">
              <Checkbox>Remember me for 30 days</Checkbox>
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                long
                loading={loading}
              >
                Sign In
              </Button>
            </FormItem>
          </Form>

          <Divider orientation="center">
            <Text type="secondary" style={{ fontSize: 12 }}>OR</Text>
          </Divider>

          <Button
            long
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          >
            {showDemoAccounts ? 'Hide' : 'Show'} Demo Accounts
          </Button>

          {showDemoAccounts && (
            <Space direction="vertical" size="medium" style={{ width: '100%' }}>
              <Alert
                type="info"
                content="All demo accounts use password: password123"
              />
              
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {demoAccounts.map((account) => (
                  <Card
                    key={account.id}
                    hoverable
                    style={{ cursor: 'pointer' }}
                    onClick={() => fillDemoAccount(account)}
                  >
                    <Row justify="space-between" align="center">
                      <Col>
                        <Space>
                          <Text strong>{account.name}</Text>
                          <Tag color={getRoleColor(account.role)} size="small">
                            {getRoleLabel(account.role)}
                          </Tag>
                        </Space>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {account.email}
                          </Text>
                        </div>
                      </Col>
                      <Col>
                        <Button type="primary" size="small">
                          Use
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Space>
          )}
        </Space>
      </Card>
    </div>
  );
}