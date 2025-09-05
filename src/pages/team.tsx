import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Avatar,
  Tag,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  Select,
  Message
} from '@arco-design/web-react';
import {
  IconPlus,
  IconMore,
  IconEdit,
  IconDelete,
  IconUser
} from '@arco-design/web-react/icon';

const { Title, Text } = Typography;

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'agency_admin' | 'agency_member' | 'client_admin' | 'client_member';
  department: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  avatar?: string;
}

export default function Team() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@agency.com',
      role: 'agency_admin',
      department: 'Management',
      status: 'active',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@agency.com',
      role: 'agency_member',
      department: 'Development',
      status: 'active',
      joinedDate: '2024-03-20'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@client.com',
      role: 'client_admin',
      department: 'Marketing',
      status: 'active',
      joinedDate: '2024-05-10'
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      email: 'emma@client.com',
      role: 'client_member',
      department: 'Sales',
      status: 'inactive',
      joinedDate: '2024-06-01'
    }
  ];

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

  const handleAddMember = (values: any) => {
    console.log('Adding member:', values);
    Message.success('Team member added successfully');
    setVisible(false);
    form.resetFields();
  };

  const actionMenu = (member: TeamMember) => (
    <Menu>
      <Menu.Item key="edit">
        <IconEdit /> Edit
      </Menu.Item>
      <Menu.Item key="delete">
        <IconDelete /> Remove
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Member',
      key: 'member',
      render: (_: any, record: TeamMember) => (
        <Space>
          <Avatar size={36} style={{ backgroundColor: '#165DFF' }}>
            {record.avatar ? (
              <img src={record.avatar} alt={record.name} />
            ) : (
              record.name.charAt(0)
            )}
          </Avatar>
          <div>
            <Text strong>{record.name}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.email}
              </Text>
            </div>
          </div>
        </Space>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      render: (role: string) => (
        <Tag color={getRoleColor(role)}>
          {getRoleLabel(role)}
        </Tag>
      )
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 120
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      )
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      key: 'joinedDate',
      width: 120
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_: any, record: TeamMember) => (
        <Dropdown droplist={actionMenu(record)} position="br">
          <Button type="text" icon={<IconMore />} />
        </Dropdown>
      )
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title heading={3} style={{ marginBottom: 8 }}>Team Management</Title>
          <Text type="secondary">Manage team members and their roles</Text>
        </div>
        <Button type="primary" icon={<IconPlus />} onClick={() => setVisible(true)}>
          Add Member
        </Button>
      </div>

      <Card className="content-card">
        <Table
          columns={columns}
          data={teamMembers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showTotal: true
          }}
        />
      </Card>

      <Modal
        title="Add Team Member"
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        autoFocus={false}
        focusLock={true}
      >
        <Form
          form={form}
          layout="vertical"
          onSubmit={handleAddMember}
        >
          <Form.Item
            field="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter full name' }]}
          >
            <Input placeholder="Enter full name" prefix={<IconUser />} />
          </Form.Item>

          <Form.Item
            field="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            field="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select placeholder="Select role">
              <Select.Option value="agency_admin">Agency Admin</Select.Option>
              <Select.Option value="agency_member">Agency Member</Select.Option>
              <Select.Option value="client_admin">Client Admin</Select.Option>
              <Select.Option value="client_member">Client Member</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            field="department"
            label="Department"
            rules={[{ required: true, message: 'Please enter department' }]}
          >
            <Input placeholder="Enter department" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}