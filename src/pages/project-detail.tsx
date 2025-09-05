import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  Tabs,
  Typography,
  Space,
  Progress,
  Timeline,
  Avatar,
  Button,
  Tag,
  Descriptions,
  Upload,
  Table,
  Empty
} from '@arco-design/web-react';
import {
  IconFile,
  IconMessage,
  IconCalendar,
  IconUser
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const TabPane = Tabs.TabPane;

export default function ProjectDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const project = {
    name: 'E-commerce Platform Redesign',
    client: 'TechCorp Inc.',
    status: 'in-progress',
    progress: 65,
    startDate: '2025-08-01',
    endDate: '2025-10-15',
    budget: 50000,
    spent: 32500,
    description: 'Complete redesign of the e-commerce platform with modern UI/UX principles.',
    team: [
      { name: 'Alice Johnson', role: 'Project Manager' },
      { name: 'Bob Smith', role: 'Lead Developer' },
      { name: 'Charlie Davis', role: 'UI/UX Designer' }
    ]
  };

  const files = [
    { key: '1', name: 'Project_Proposal.pdf', size: '2.4 MB', uploadTime: '2025-08-05', uploader: 'Alice' },
    { key: '2', name: 'Design_Mockups.fig', size: '15.8 MB', uploadTime: '2025-08-10', uploader: 'Charlie' },
    { key: '3', name: 'Requirements.docx', size: '524 KB', uploadTime: '2025-08-03', uploader: 'Alice' }
  ];

  const activities = [
    { date: '2025-09-05', content: 'Design review meeting completed', type: 'success' },
    { date: '2025-09-03', content: 'Frontend development started', type: 'info' },
    { date: '2025-08-28', content: 'Database schema approved', type: 'success' },
    { date: '2025-08-15', content: 'Project kickoff meeting', type: 'info' }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card className="content-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <Title heading={3} style={{ marginBottom: 8 }}>{project.name}</Title>
            <Space>
              <Text type="secondary">{project.client}</Text>
              <Tag color={project.status === 'in-progress' ? 'blue' : 'green'}>
                {project.status === 'in-progress' ? 'In Progress' : 'Active'}
              </Tag>
            </Space>
          </div>
          <Space>
            <Button type="primary">Edit Project</Button>
            <Button>Export Report</Button>
          </Space>
        </div>

        <div style={{ marginTop: 24 }}>
          <Progress
            percent={project.progress}
            strokeWidth={12}
            formatText={(percent) => `${percent}% Complete`}
          />
        </div>
      </Card>

      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        <TabPane key="overview" title="Overview">
          <Card className="content-card">
            <Descriptions
              column={2}
              title="Project Details"
              data={[
                { label: 'Start Date', value: project.startDate },
                { label: 'End Date', value: project.endDate },
                { label: 'Budget', value: `$${project.budget.toLocaleString()}` },
                { label: 'Spent', value: `$${project.spent.toLocaleString()}` },
                { label: 'Status', value: project.status },
                { label: 'Progress', value: `${project.progress}%` }
              ]}
            />

            <div style={{ marginTop: 32 }}>
              <Title heading={5} style={{ marginBottom: 16 }}>Team Members</Title>
              <Space>
                {project.team.map((member, index) => (
                  <Card key={index} style={{ width: 200 }}>
                    <Space>
                      <Avatar size={40} style={{ backgroundColor: '#165DFF' }}>
                        {member.name[0]}
                      </Avatar>
                      <div>
                        <Text strong>{member.name}</Text>
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {member.role}
                          </Text>
                        </div>
                      </div>
                    </Space>
                  </Card>
                ))}
              </Space>
            </div>
          </Card>
        </TabPane>

        <TabPane key="files" title={<><IconFile /> Files</>}>
          <Card className="content-card">
            <div style={{ marginBottom: 16 }}>
              <Upload.Dragger
                multiple
                accept="*"
                action="/"
                tip="Click or drag files to upload"
              />
            </div>

            {files.length > 0 ? (
              <Table
                columns={[
                  { title: 'File Name', dataIndex: 'name', key: 'name' },
                  { title: 'Size', dataIndex: 'size', key: 'size', width: 100 },
                  { title: 'Upload Time', dataIndex: 'uploadTime', key: 'uploadTime', width: 120 },
                  { title: 'Uploader', dataIndex: 'uploader', key: 'uploader', width: 100 },
                  {
                    title: 'Actions',
                    key: 'actions',
                    width: 100,
                    render: () => (
                      <Space>
                        <Button type="text" size="small">Download</Button>
                        <Button type="text" size="small" status="danger">Delete</Button>
                      </Space>
                    )
                  }
                ]}
                data={files}
              />
            ) : (
              <Empty description="No files uploaded yet" />
            )}
          </Card>
        </TabPane>

        <TabPane key="activity" title={<><IconCalendar /> Activity</>}>
          <Card className="content-card">
            <Timeline>
              {activities.map((activity, index) => (
                <Timeline.Item
                  key={index}
                  label={activity.date}
                  dotColor={activity.type === 'success' ? 'green' : 'blue'}
                >
                  {activity.content}
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </TabPane>

        <TabPane key="discussion" title={<><IconMessage /> Discussion</>}>
          <Card className="content-card">
            <Empty description="No discussions yet" />
          </Card>
        </TabPane>
      </Tabs>
    </Space>
  );
}