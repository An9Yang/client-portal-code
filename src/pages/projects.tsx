import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Input,
  Select,
  Tag,
  Progress,
  Avatar,
  Empty,
  Dropdown,
  Menu,
  Modal,
  Form,
  DatePicker,
  Notification,
  Grid,
  Badge
} from '@arco-design/web-react';
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconMore,
  IconEye,
  IconEdit,
  IconDelete,
  IconDownload,
  IconCopy,
  IconArchive,
  IconStar,
  IconStarFill,
  IconFolder
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;
const { Row, Col } = Grid;
const FormItem = Form.Item;

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  team: string[];
  startDate: string;
  endDate: string;
  budget: number;
  starred?: boolean;
}

export default function Projects() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Platform Redesign',
      client: 'TechCorp Inc.',
      status: 'in-progress',
      progress: 65,
      team: ['Alice', 'Bob', 'Charlie'],
      startDate: '2025-08-01',
      endDate: '2025-10-15',
      budget: 50000,
      starred: false
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      client: 'FinanceHub',
      status: 'planning',
      progress: 15,
      team: ['David', 'Emma'],
      startDate: '2025-09-15',
      endDate: '2025-12-30',
      budget: 80000,
      starred: true
    },
    {
      id: '3',
      name: 'Marketing Dashboard',
      client: 'AdAgency Pro',
      status: 'review',
      progress: 90,
      team: ['Frank', 'Grace', 'Henry'],
      startDate: '2025-07-01',
      endDate: '2025-09-20',
      budget: 35000,
      starred: false
    },
    {
      id: '4',
      name: 'Healthcare Portal',
      client: 'MediCare Solutions',
      status: 'completed',
      progress: 100,
      team: ['Ivan', 'Julia', 'Kevin', 'Laura'],
      startDate: '2025-05-01',
      endDate: '2025-08-31',
      budget: 120000,
      starred: true
    },
    {
      id: '5',
      name: 'Real Estate Platform',
      client: 'PropertyHub',
      status: 'in-progress',
      progress: 45,
      team: ['Michael', 'Nancy'],
      startDate: '2025-08-15',
      endDate: '2025-11-30',
      budget: 65000,
      starred: false
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'planning': 'orange',
      'in-progress': 'blue',
      'review': 'green',
      'completed': 'gray'
    };
    return colors[status] || 'gray';
  };

  const handleToggleStar = (id: string) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      )
    );
  };

  const handleBatchDelete = () => {
    Modal.confirm({
      title: 'Delete Projects',
      content: `Are you sure you want to delete ${selectedRowKeys.length} project(s)?`,
      okText: 'Delete',
      okButtonProps: { status: 'danger' },
      onOk: () => {
        setProjects((prev) => 
          prev.filter((item) => !selectedRowKeys.includes(item.id))
        );
        setSelectedRowKeys([]);
        Notification.success({
          title: 'Success',
          content: 'Projects deleted successfully',
        });
      },
    });
  };

  const handleCreateProject = () => {
    form.validate((errors, values) => {
      if (!errors) {
        const newProject: Project = {
          id: `${projects.length + 1}`,
          name: values.name,
          client: values.client,
          status: 'planning',
          progress: 0,
          team: [],
          startDate: values.startDate.format('YYYY-MM-DD'),
          endDate: values.endDate.format('YYYY-MM-DD'),
          budget: parseInt(values.budget),
          starred: false,
        };
        setProjects((prev) => [newProject, ...prev]);
        setCreateModalVisible(false);
        form.resetFields();
        Notification.success({
          title: 'Success',
          content: 'Project created successfully',
        });
      }
    });
  };

  const handleDuplicateProject = (project: Project) => {
    const duplicatedProject: Project = {
      ...project,
      id: `${projects.length + 1}`,
      name: `${project.name} (Copy)`,
      status: 'planning',
      progress: 0,
      starred: false
    };
    setProjects((prev) => [duplicatedProject, ...prev]);
    Notification.success({
      title: 'Success',
      content: 'Project duplicated successfully',
    });
  };

  const handleArchiveProject = (id: string) => {
    Modal.confirm({
      title: 'Archive Project',
      content: 'Are you sure you want to archive this project?',
      onOk: () => {
        setProjects((prev) => prev.filter((item) => item.id !== id));
        Notification.success({
          title: 'Success',
          content: 'Project archived successfully',
        });
      },
    });
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredProjects, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'projects.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    Notification.success({
      title: 'Success',
      content: 'Projects exported successfully',
    });
  };

  const columns = [
    {
      title: '',
      dataIndex: 'starred',
      key: 'starred',
      width: 50,
      render: (starred: boolean, record: Project) => (
        <Button
          type="text"
          icon={starred ? <IconStarFill style={{ color: '#faad14' }} /> : <IconStar />}
          onClick={() => handleToggleStar(record.id)}
        />
      )
    },
    {
      title: 'Project',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Project) => (
        <Space>
          <div>
            <Text strong>{name}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.client} • ID: PRJ-{record.id.padStart(3, '0')}
              </Text>
            </div>
          </div>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </Tag>
      )
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 150,
      render: (progress: number) => (
        <Progress 
          percent={progress} 
          size="small" 
          status={progress === 100 ? 'success' : undefined}
        />
      )
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      width: 150,
      render: (team: string[]) => (
        <Avatar.Group size={28}>
          {team.slice(0, 3).map((member, index) => (
            <Avatar key={index} style={{ backgroundColor: '#165DFF' }}>
              {member[0]}
            </Avatar>
          ))}
          {team.length > 3 && (
            <Avatar style={{ backgroundColor: '#86909c' }}>
              +{team.length - 3}
            </Avatar>
          )}
        </Avatar.Group>
      )
    },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      width: 120,
      render: (budget: number) => (
        <Text>${budget.toLocaleString()}</Text>
      )
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_: any, record: Project) => (
        <Dropdown
          droplist={
            <Menu>
              <Menu.Item key="view" onClick={() => navigate(`/projects/${record.id}`)}>
                <IconEye /> View Details
              </Menu.Item>
              <Menu.Item key="edit">
                <IconEdit /> Edit Project
              </Menu.Item>
              <Menu.Item key="duplicate" onClick={() => handleDuplicateProject(record)}>
                <IconCopy /> Duplicate
              </Menu.Item>
              <Menu.Item key="download">
                <IconDownload /> Export Data
              </Menu.Item>
              <Menu.Item key="archive" onClick={() => handleArchiveProject(record.id)}>
                <IconArchive /> Archive
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item 
                key="delete" 
                style={{ color: '#ff4d4f' }}
                onClick={() => {
                  Modal.confirm({
                    title: 'Delete Project',
                    content: 'Are you sure you want to delete this project?',
                    okText: 'Delete',
                    okButtonProps: { status: 'danger' },
                    onOk: () => {
                      setProjects((prev) => prev.filter((item) => item.id !== record.id));
                      Notification.success({
                        title: 'Success',
                        content: 'Project deleted successfully',
                      });
                    },
                  });
                }}
              >
                <IconDelete /> Delete
              </Menu.Item>
            </Menu>
          }
          position="br"
        >
          <Button type="text" icon={<IconMore />} />
        </Dropdown>
      )
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchValue.toLowerCase()) ||
                         `PRJ-${project.id.padStart(3, '0')}`.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    planning: projects.filter(p => p.status === 'planning').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    review: projects.filter(p => p.status === 'review').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title heading={3} style={{ marginBottom: 8 }}>Projects</Title>
          <Text type="secondary">Manage and track all your projects</Text>
        </div>
        <Space>
          {selectedRowKeys.length > 0 && (
            <Button 
              status="danger" 
              onClick={handleBatchDelete}
            >
              Delete Selected ({selectedRowKeys.length})
            </Button>
          )}
          <Button onClick={handleExportData}>
            <IconDownload /> Export
          </Button>
          <Button type="primary" icon={<IconPlus />} onClick={() => setCreateModalVisible(true)}>
            New Project
          </Button>
        </Space>
      </div>

      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col span={4}>
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">Total</Text>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#165DFF' }}>{stats.total}</div>
                </div>
              </Col>
              <Col span={5}>
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">Planning</Text>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#ff7d00' }}>{stats.planning}</div>
                </div>
              </Col>
              <Col span={5}>
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">In Progress</Text>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#165DFF' }}>{stats.inProgress}</div>
                </div>
              </Col>
              <Col span={5}>
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">Review</Text>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#00b42a' }}>{stats.review}</div>
                </div>
              </Col>
              <Col span={5}>
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">Completed</Text>
                  <div style={{ fontSize: 24, fontWeight: 600, color: '#86909c' }}>{stats.completed}</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Card className="content-card">
        <Space style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="Search projects, clients, or IDs..."
            style={{ width: 350 }}
            prefix={<IconSearch />}
            value={searchValue}
            onChange={setSearchValue}
          />
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Planning', value: 'planning' },
              { label: 'In Progress', value: 'in-progress' },
              { label: 'Review', value: 'review' },
              { label: 'Completed', value: 'completed' }
            ]}
          />
        </Space>

        {filteredProjects.length > 0 ? (
          <Table
            columns={columns}
            data={filteredProjects}
            rowKey="id"
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys as string[]),
            }}
            pagination={{
              pageSize: 10,
              showTotal: true
            }}
          />
        ) : (
          <Empty description="No projects found" />
        )}
      </Card>

      <Modal
        title="Create New Project"
        visible={createModalVisible}
        onOk={handleCreateProject}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        autoFocus={false}
        focusLock={true}
        style={{ width: 600 }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <FormItem
            label="Project Name"
            field="name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="Enter project name" />
          </FormItem>
          <FormItem
            label="Client"
            field="client"
            rules={[{ required: true, message: 'Please enter client name' }]}
          >
            <Input placeholder="Enter client name" />
          </FormItem>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                label="Start Date"
                field="startDate"
                rules={[{ required: true, message: 'Please select start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="End Date"
                field="endDate"
                rules={[{ required: true, message: 'Please select end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
            </Col>
          </Row>
          <FormItem
            label="Budget"
            field="budget"
            rules={[{ required: true, message: 'Please enter budget' }]}
          >
            <Input placeholder="Enter budget amount (e.g., 50000)" />
          </FormItem>
        </Form>
      </Modal>
    </Space>
  );
}