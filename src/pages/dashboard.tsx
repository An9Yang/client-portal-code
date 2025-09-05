import { Card, Grid, Statistic, Space, Typography, Progress, Table } from '@arco-design/web-react';
import {
  IconArrowUp,
  IconArrowDown,
  IconCheckCircle,
  IconClockCircle,
  IconExclamationCircle,
  IconUser
} from '@arco-design/web-react/icon';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

export default function Dashboard() {
  const stats = [
    {
      title: 'Active Projects',
      value: 12,
      trend: 20,
      icon: <IconCheckCircle style={{ color: '#00b42a' }} />,
      color: '#00b42a'
    },
    {
      title: 'Pending Approvals',
      value: 5,
      trend: -10,
      icon: <IconClockCircle style={{ color: '#ff7d00' }} />,
      color: '#ff7d00'
    },
    {
      title: 'Completed Tasks',
      value: 142,
      trend: 15,
      icon: <IconCheckCircle style={{ color: '#165DFF' }} />,
      color: '#165DFF'
    },
    {
      title: 'Issues',
      value: 3,
      trend: 0,
      icon: <IconExclamationCircle style={{ color: '#f53f3f' }} />,
      color: '#f53f3f'
    }
  ];

  const recentProjects = [
    {
      key: '1',
      name: 'Website Redesign',
      client: 'TechCorp Inc.',
      status: 'In Progress',
      progress: 65,
      dueDate: '2025-10-15'
    },
    {
      key: '2',
      name: 'Mobile App Development',
      client: 'StartupXYZ',
      status: 'Planning',
      progress: 20,
      dueDate: '2025-11-30'
    },
    {
      key: '3',
      name: 'Marketing Campaign',
      client: 'RetailStore',
      status: 'Review',
      progress: 85,
      dueDate: '2025-09-20'
    }
  ];

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          'In Progress': 'blue',
          'Planning': 'orange',
          'Review': 'green',
          'Completed': 'gray'
        };
        return (
          <span style={{
            padding: '2px 8px',
            borderRadius: 4,
            backgroundColor: colors[status] ? `var(--color-${colors[status]}-1)` : '#f0f0f0',
            color: colors[status] ? `var(--color-${colors[status]}-6)` : '#666'
          }}>
            {status}
          </span>
        );
      }
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" style={{ width: 100 }} />
      )
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title heading={3} style={{ marginBottom: 8 }}>Dashboard Overview</Title>
        <Text type="secondary">Track your projects and team performance</Text>
      </div>

      <Row gutter={16}>
        {stats.map((stat, index) => (
          <Col span={6} key={index}>
            <Card className="content-card">
              <Statistic
                title={
                  <Space>
                    {stat.icon}
                    <Text>{stat.title}</Text>
                  </Space>
                }
                value={stat.value}
                suffix={
                  stat.trend !== 0 && (
                    <span style={{ fontSize: 14, color: stat.trend > 0 ? '#00b42a' : '#f53f3f' }}>
                      {stat.trend > 0 ? <IconArrowUp /> : <IconArrowDown />}
                      {Math.abs(stat.trend)}%
                    </span>
                  )
                }
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Card className="content-card" title="Recent Projects">
            <Table
              columns={columns}
              data={recentProjects}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card className="content-card" title="Quick Actions">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Card
                hoverable
                style={{ backgroundColor: '#f7f8fa', cursor: 'pointer' }}
              >
                <Space>
                  <IconCheckCircle style={{ fontSize: 20, color: '#165DFF' }} />
                  <div>
                    <Text strong>Create New Project</Text>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Start a new client project
                      </Text>
                    </div>
                  </div>
                </Space>
              </Card>
              
              <Card
                hoverable
                style={{ backgroundColor: '#f7f8fa', cursor: 'pointer' }}
              >
                <Space>
                  <IconUser style={{ fontSize: 20, color: '#00b42a' }} />
                  <div>
                    <Text strong>Invite Team Member</Text>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Add new members to your team
                      </Text>
                    </div>
                  </div>
                </Space>
              </Card>
              
              <Card
                hoverable
                style={{ backgroundColor: '#f7f8fa', cursor: 'pointer' }}
              >
                <Space>
                  <IconClockCircle style={{ fontSize: 20, color: '#ff7d00' }} />
                  <div>
                    <Text strong>View Pending Tasks</Text>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        5 tasks need your attention
                      </Text>
                    </div>
                  </div>
                </Space>
              </Card>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}