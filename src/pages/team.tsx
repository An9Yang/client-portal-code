/**
 * Team Page - Comprehensive team management and resource allocation
 * Manages team members, skills, availability, and performance metrics
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus, Search, Filter, MoreVertical, Mail, Phone, MapPin,
  Calendar, Clock, Award, TrendingUp, Users, Briefcase,
  Activity, Target, CheckCircle2, AlertCircle, XCircle,
  UserPlus, Settings, Shield, Star, BarChart3, Download,
  Edit, Trash2, Eye, MessageSquare, Video, Send
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  phone: string;
  location: string;
  joinedDate: string;
  status: "active" | "away" | "busy" | "offline";
  skills: string[];
  utilization: number;
  performance: number;
  projects: number;
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
  };
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  hourlyRate: number;
  billableHours: number;
  totalHours: number;
}

export default function Team() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messagingMember, setMessagingMember] = useState<TeamMember | null>(null);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [removingMember, setRemovingMember] = useState<TeamMember | null>(null);

  // Team members data aligned with Projects and Tasks
  const teamMembers: TeamMember[] = [
    {
      id: "SW",
      name: "Sarah Wilson",
      email: "sarah.wilson@agency.com",
      role: "Senior Developer",
      department: "Engineering",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      joinedDate: "2022-03-15",
      status: "active",
      skills: ["React", "TypeScript", "Node.js", "AWS", "Python"],
      utilization: 92,
      performance: 95,
      projects: 4,
      tasks: { total: 45, completed: 36, inProgress: 9 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true
      },
      hourlyRate: 150,
      billableHours: 142,
      totalHours: 160
    },
    {
      id: "MC",
      name: "Michael Chen",
      email: "michael.chen@agency.com",
      role: "Full Stack Developer",
      department: "Engineering",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      joinedDate: "2021-11-20",
      status: "busy",
      skills: ["Vue.js", "Python", "Docker", "MongoDB", "GraphQL"],
      utilization: 88,
      performance: 92,
      projects: 5,
      tasks: { total: 42, completed: 28, inProgress: 14 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: true
      },
      hourlyRate: 140,
      billableHours: 135,
      totalHours: 160
    },
    {
      id: "ER",
      name: "Emma Rodriguez",
      email: "emma.rodriguez@agency.com",
      role: "UX/UI Designer",
      department: "Design",
      phone: "+1 (555) 345-6789",
      location: "Los Angeles, CA",
      joinedDate: "2023-01-10",
      status: "active",
      skills: ["Figma", "Sketch", "Adobe XD", "Prototyping", "User Research"],
      utilization: 75,
      performance: 88,
      projects: 3,
      tasks: { total: 38, completed: 30, inProgress: 8 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: false
      },
      hourlyRate: 130,
      billableHours: 120,
      totalHours: 160
    },
    {
      id: "AJ",
      name: "Alex Johnson",
      email: "alex.johnson@agency.com",
      role: "Project Manager",
      department: "Management",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      joinedDate: "2020-08-05",
      status: "active",
      skills: ["Agile", "Scrum", "JIRA", "Risk Management", "Communication"],
      utilization: 81,
      performance: 90,
      projects: 6,
      tasks: { total: 40, completed: 35, inProgress: 5 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true
      },
      hourlyRate: 120,
      billableHours: 130,
      totalHours: 160
    },
    {
      id: "DL",
      name: "David Lee",
      email: "david.lee@agency.com",
      role: "DevOps Engineer",
      department: "Engineering",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      joinedDate: "2022-06-12",
      status: "away",
      skills: ["Kubernetes", "AWS", "CI/CD", "Terraform", "Linux"],
      utilization: 69,
      performance: 85,
      projects: 2,
      tasks: { total: 35, completed: 25, inProgress: 10 },
      availability: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: true,
        friday: true
      },
      hourlyRate: 145,
      billableHours: 110,
      totalHours: 160
    },
    {
      id: "JM",
      name: "Jessica Martinez",
      email: "jessica.martinez@agency.com",
      role: "Marketing Manager",
      department: "Marketing",
      phone: "+1 (555) 678-9012",
      location: "Austin, TX",
      joinedDate: "2021-04-18",
      status: "active",
      skills: ["SEO", "Content Marketing", "Analytics", "Social Media", "Email Marketing"],
      utilization: 78,
      performance: 87,
      projects: 3,
      tasks: { total: 28, completed: 22, inProgress: 6 },
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true
      },
      hourlyRate: 110,
      billableHours: 125,
      totalHours: 160
    }
  ];

  // Filter team members
  const filteredMembers = teamMembers.filter(member => {
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesStatus && matchesSearch;
  });

  // Calculate team statistics
  const stats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === "active").length,
    avgUtilization: Math.round(teamMembers.reduce((sum, m) => sum + m.utilization, 0) / teamMembers.length),
    avgPerformance: Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length),
    totalProjects: teamMembers.reduce((sum, m) => sum + m.projects, 0),
    totalTasks: teamMembers.reduce((sum, m) => sum + m.tasks.total, 0),
    completedTasks: teamMembers.reduce((sum, m) => sum + m.tasks.completed, 0),
    totalBillableHours: teamMembers.reduce((sum, m) => sum + m.billableHours, 0),
  };

  // Get unique departments
  const departments = Array.from(new Set(teamMembers.map(m => m.department)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-amber-500';
      case 'away': return 'bg-blue-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 75) return 'text-blue-600';
    if (performance >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members, skills, and resource allocation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>
            <Briefcase className="mr-2 h-4 w-4" />
            Projects
          </Button>
          <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
                <DialogDescription>
                  Add a new member to your team and assign their role and permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@agency.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="manager">Project Manager</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="Enter skills separated by commas"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, State" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowAddMember(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddMember(false)}>
                    Add Member
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeMembers} active now
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgUtilization}%</div>
            <Progress value={stats.avgUtilization} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPerformance}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-600 mr-1" />
              +3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBillableHours}h</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="busy">Busy</SelectItem>
            <SelectItem value="away">Away</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        {member.avatar ? (
                          <AvatarImage src={member.avatar} />
                        ) : (
                          <AvatarFallback>{member.id}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/team/${member.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setEditingMember(member);
                            setShowEditDialog(true);
                          }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setMessagingMember(member);
                            setShowMessageDialog(true);
                          }}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            toast.info(`Starting video call with ${member.name}...`);
                            setTimeout(() => {
                              toast.success(`Video call with ${member.name} started`);
                            }, 2000);
                          }}>
                            <Video className="mr-2 h-4 w-4" />
                            Start Video Call
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setRemovingMember(member);
                              setShowRemoveDialog(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.location}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Utilization</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{member.utilization}%</span>
                        <Progress value={member.utilization} className="flex-1 h-1" />
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Performance</p>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </span>
                        {member.performance >= 90 && <Star className="h-3 w-3 text-yellow-500" />}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {member.projects} projects • {member.tasks.inProgress} active tasks
                    </span>
                    <Badge variant="outline">{member.department}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{member.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Metrics</CardTitle>
              <CardDescription>
                Track individual and team performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Billable Hours</TableHead>
                    <TableHead>Performance Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => {
                    const completionRate = Math.round(
                      (member.tasks.completed / member.tasks.total) * 100
                    );
                    return (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{member.id}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            {member.tasks.completed}/{member.tasks.total}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={completionRate} className="w-20 h-2" />
                            <span className="text-sm">{completionRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {member.billableHours}h / {member.totalHours}h
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${getPerformanceColor(member.performance)}`}>
                              {member.performance}%
                            </span>
                            {member.performance >= 90 && (
                              <Award className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/team/${member.id}`)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Availability Matrix</CardTitle>
              <CardDescription>
                View team member availability across the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Mon</TableHead>
                    <TableHead className="text-center">Tue</TableHead>
                    <TableHead className="text-center">Wed</TableHead>
                    <TableHead className="text-center">Thu</TableHead>
                    <TableHead className="text-center">Fri</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{member.id}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(member.status)}`} />
                          <span className="text-sm capitalize">{member.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {member.availability.monday ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {member.availability.tuesday ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {member.availability.wednesday ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {member.availability.thursday ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {member.availability.friday ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={member.utilization} className="w-20 h-2" />
                          <span className="text-sm">{member.utilization}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-3 w-3" />
                          Schedule
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Matrix Tab */}
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Skills Matrix</CardTitle>
              <CardDescription>
                Overview of team capabilities and expertise areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Skills by Category */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Frontend Development</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {["React", "Vue.js", "TypeScript", "CSS/Tailwind"].map((skill) => {
                        const count = teamMembers.filter(m =>
                          m.skills.includes(skill)
                        ).length;
                        return (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm">{skill}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={(count / teamMembers.length) * 100} className="w-20 h-2" />
                              <span className="text-xs text-muted-foreground">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Backend Development</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {["Node.js", "Python", "AWS", "MongoDB"].map((skill) => {
                        const count = teamMembers.filter(m =>
                          m.skills.includes(skill)
                        ).length;
                        return (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm">{skill}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={(count / teamMembers.length) * 100} className="w-20 h-2" />
                              <span className="text-xs text-muted-foreground">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Design & UX</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {["Figma", "Adobe XD", "Prototyping", "User Research"].map((skill) => {
                        const count = teamMembers.filter(m =>
                          m.skills.includes(skill)
                        ).length;
                        return (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-sm">{skill}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={(count / teamMembers.length) * 100} className="w-20 h-2" />
                              <span className="text-xs text-muted-foreground">{count}</span>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Individual Skills */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Individual Expertise</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Primary Skills</TableHead>
                        <TableHead>Skill Level</TableHead>
                        <TableHead>Certifications</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{member.id}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {member.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <Star
                                  key={level}
                                  className={`h-3 w-3 ${
                                    level <= Math.ceil(member.performance / 20)
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              {Math.floor(member.skills.length / 2)} Certified
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Settings className="mr-2 h-3 w-3" />
                              Manage Skills
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Member Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update {editingMember?.name}'s information and role.
            </DialogDescription>
          </DialogHeader>
          {editingMember && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={editingMember.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={editingMember.email} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Input id="edit-role" defaultValue={editingMember.role} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select defaultValue={editingMember.department}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" defaultValue={editingMember.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input id="edit-location" defaultValue={editingMember.location} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-skills">Skills</Label>
                <Textarea
                  id="edit-skills"
                  defaultValue={editingMember.skills.join(", ")}
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-rate">Hourly Rate ($)</Label>
                  <Input
                    id="edit-rate"
                    type="number"
                    defaultValue={editingMember.hourlyRate}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={editingMember.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="away">Away</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success(`${editingMember.name}'s profile has been updated`);
                  setShowEditDialog(false);
                }}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a message to {messagingMember?.name}
            </DialogDescription>
          </DialogHeader>
          {messagingMember && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{messagingMember.id}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{messagingMember.name}</p>
                  <p className="text-sm text-muted-foreground">{messagingMember.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message-subject">Subject</Label>
                <Input id="message-subject" placeholder="Message subject..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message-content">Message</Label>
                <Textarea
                  id="message-content"
                  placeholder="Type your message here..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Message will be sent to {messagingMember.email}</span>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success(`Message sent to ${messagingMember.name}`);
                  setShowMessageDialog(false);
                }}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove Member Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {removingMember?.name} from the team?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {removingMember && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{removingMember.id}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{removingMember.name}</p>
                  <p className="text-sm text-muted-foreground">{removingMember.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Active projects: {removingMember.projects}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Pending tasks: {removingMember.tasks.inProgress}</span>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowRemoveDialog(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast.success(`${removingMember.name} has been removed from the team`);
                    setShowRemoveDialog(false);
                  }}
                >
                  Remove Member
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}