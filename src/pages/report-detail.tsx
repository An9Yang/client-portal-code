/**
 * Report Detail Page - Comprehensive report viewing and management interface
 * Shows detailed report data, visualizations, exports, and sharing options
 */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import {
  ArrowLeft, MoreVertical, Calendar as CalendarIcon, Download, Share2,
  FileText, FileSpreadsheet, FileJson, Mail, Printer, Filter,
  RefreshCw, Settings, TrendingUp, TrendingDown, Activity,
  DollarSign, Users, Briefcase, Target, CheckCircle2, AlertCircle,
  Clock, ChevronRight, Eye, Edit, Trash2, Send, Archive,
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  Info, ExternalLink, Copy, Lock, Unlock, Bell, BellOff
} from "lucide-react";

interface ReportData {
  id: string;
  title: string;
  description: string;
  type: "performance" | "financial" | "project" | "team" | "custom";
  category: string;
  status: "draft" | "published" | "archived";
  visibility: "public" | "private" | "restricted";
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  lastViewed: Date;
  views: number;
  exports: number;
  schedule: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "none";
    nextRun?: Date;
    recipients: string[];
  };
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: {
    revenue: number;
    revenueChange: number;
    profit: number;
    profitChange: number;
    projects: number;
    projectsChange: number;
    tasks: number;
    tasksChange: number;
    teamUtilization: number;
    utilizationChange: number;
    customerSatisfaction: number;
    satisfactionChange: number;
  };
  charts: {
    revenue: Array<{ month: string; value: number; target: number }>;
    projects: Array<{ status: string; count: number; percentage: number }>;
    team: Array<{ member: string; hours: number; efficiency: number }>;
    tasks: Array<{ week: string; completed: number; pending: number }>;
  };
  tables: {
    topProjects: Array<{
      name: string;
      client: string;
      revenue: number;
      status: string;
      completion: number;
    }>;
    teamPerformance: Array<{
      member: string;
      role: string;
      tasksCompleted: number;
      efficiency: number;
      rating: number;
    }>;
  };
  filters: {
    projects?: string[];
    teams?: string[];
    dateRange?: string;
    customFilters?: any;
  };
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canShare: boolean;
    canExport: boolean;
  };
  shareHistory: Array<{
    id: string;
    sharedWith: string;
    sharedBy: string;
    date: Date;
    permissions: string;
  }>;
  exportHistory: Array<{
    id: string;
    format: string;
    exportedBy: string;
    date: Date;
    size: string;
  }>;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: Date;
  }>;
}

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock report data
  const reportData: ReportData = {
    id: id || "RPT-001",
    title: "Q4 2024 Performance Report",
    description: "Comprehensive analysis of Q4 2024 performance including revenue, project completion rates, team productivity, and customer satisfaction metrics.",
    type: "performance",
    category: "Quarterly Reports",
    status: "published",
    visibility: "private",
    author: {
      id: "AJ",
      name: "Alex Johnson",
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    lastViewed: new Date("2024-01-20"),
    views: 156,
    exports: 23,
    schedule: {
      frequency: "monthly",
      nextRun: new Date("2024-02-01"),
      recipients: ["team@company.com", "executives@company.com"]
    },
    dateRange: {
      start: new Date("2024-10-01"),
      end: new Date("2024-12-31")
    },
    metrics: {
      revenue: 2456789,
      revenueChange: 15.3,
      profit: 892340,
      profitChange: 12.7,
      projects: 24,
      projectsChange: 20,
      tasks: 156,
      tasksChange: -5,
      teamUtilization: 87,
      utilizationChange: 8,
      customerSatisfaction: 4.6,
      satisfactionChange: 0.3
    },
    charts: {
      revenue: [
        { month: "Oct", value: 780000, target: 750000 },
        { month: "Nov", value: 820000, target: 800000 },
        { month: "Dec", value: 856789, target: 850000 }
      ],
      projects: [
        { status: "Completed", count: 15, percentage: 62.5 },
        { status: "In Progress", count: 6, percentage: 25 },
        { status: "Planning", count: 3, percentage: 12.5 }
      ],
      team: [
        { member: "Sarah Wilson", hours: 480, efficiency: 95 },
        { member: "Michael Chen", hours: 460, efficiency: 92 },
        { member: "Emma Rodriguez", hours: 440, efficiency: 88 },
        { member: "David Lee", hours: 420, efficiency: 85 },
        { member: "Jessica Martinez", hours: 400, efficiency: 87 }
      ],
      tasks: [
        { week: "Week 1", completed: 35, pending: 10 },
        { week: "Week 2", completed: 42, pending: 8 },
        { week: "Week 3", completed: 38, pending: 12 },
        { week: "Week 4", completed: 41, pending: 9 }
      ]
    },
    tables: {
      topProjects: [
        {
          name: "E-Commerce Platform",
          client: "TechCorp Inc.",
          revenue: 450000,
          status: "In Progress",
          completion: 75
        },
        {
          name: "Mobile Banking App",
          client: "FinanceHub",
          revenue: 380000,
          status: "Completed",
          completion: 100
        },
        {
          name: "Healthcare Portal",
          client: "MediCare Solutions",
          revenue: 320000,
          status: "In Progress",
          completion: 60
        },
        {
          name: "SaaS Dashboard",
          client: "CloudTech",
          revenue: 280000,
          status: "Completed",
          completion: 100
        },
        {
          name: "Marketing Automation",
          client: "GrowthCo",
          revenue: 250000,
          status: "Planning",
          completion: 15
        }
      ],
      teamPerformance: [
        {
          member: "Sarah Wilson",
          role: "Senior Developer",
          tasksCompleted: 45,
          efficiency: 95,
          rating: 4.8
        },
        {
          member: "Michael Chen",
          role: "Full Stack Developer",
          tasksCompleted: 42,
          efficiency: 92,
          rating: 4.6
        },
        {
          member: "Emma Rodriguez",
          role: "UX/UI Designer",
          tasksCompleted: 38,
          efficiency: 88,
          rating: 4.5
        },
        {
          member: "Alex Johnson",
          role: "Project Manager",
          tasksCompleted: 40,
          efficiency: 90,
          rating: 4.7
        },
        {
          member: "David Lee",
          role: "DevOps Engineer",
          tasksCompleted: 35,
          efficiency: 85,
          rating: 4.4
        }
      ]
    },
    filters: {
      projects: ["All Projects"],
      teams: ["All Teams"],
      dateRange: "Q4 2024"
    },
    permissions: {
      canEdit: true,
      canDelete: true,
      canShare: true,
      canExport: true
    },
    shareHistory: [
      {
        id: "SH001",
        sharedWith: "john.doe@company.com",
        sharedBy: "Alex Johnson",
        date: new Date("2024-01-10"),
        permissions: "View Only"
      },
      {
        id: "SH002",
        sharedWith: "team@company.com",
        sharedBy: "Alex Johnson",
        date: new Date("2024-01-05"),
        permissions: "View & Comment"
      }
    ],
    exportHistory: [
      {
        id: "EX001",
        format: "PDF",
        exportedBy: "Alex Johnson",
        date: new Date("2024-01-15"),
        size: "2.4 MB"
      },
      {
        id: "EX002",
        format: "Excel",
        exportedBy: "Sarah Wilson",
        date: new Date("2024-01-12"),
        size: "1.8 MB"
      }
    ],
    comments: [
      {
        id: "COM001",
        author: "Sarah Wilson",
        content: "Great improvement in team utilization this quarter!",
        timestamp: new Date("2024-01-18T10:30:00")
      },
      {
        id: "COM002",
        author: "Michael Chen",
        content: "The revenue growth trend is very promising. We should maintain this momentum.",
        timestamp: new Date("2024-01-19T14:15:00")
      }
    ]
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Activity className="h-4 w-4 text-gray-400" />;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
    toast.success("Report data refreshed");
  };

  const handleExport = (format: string) => {
    toast.success(`Report exported as ${format}`);
    setShowExportDialog(false);
  };

  const handleShare = () => {
    toast.success("Report shared successfully");
    setShowShareDialog(false);
  };

  const handleDelete = () => {
    toast.success("Report deleted");
    navigate("/reports");
  };

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/reports")}
          className="gap-2 px-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Reports
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{reportData.title}</span>
      </div>

      {/* Report Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{reportData.title}</h1>
            <Badge className={cn(getStatusColor(reportData.status))}>
              {reportData.status}
            </Badge>
            <Badge variant="outline">
              {reportData.visibility === "private" ? (
                <Lock className="mr-1 h-3 w-3" />
              ) : (
                <Unlock className="mr-1 h-3 w-3" />
              )}
              {reportData.visibility}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{reportData.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {format(reportData.dateRange.start, "MMM dd")} - {format(reportData.dateRange.end, "MMM dd, yyyy")}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {reportData.views} views
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {reportData.exports} exports
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated {format(reportData.updatedAt, "MMM dd, yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExportDialog(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowShareDialog(true)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/reports/${id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowScheduleDialog(true)}>
                <Clock className="mr-2 h-4 w-4" />
                Schedule Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(reportData.metrics.revenue / 1000000).toFixed(2)}M
            </div>
            <div className="flex items-center gap-1 text-xs">
              {getChangeIcon(reportData.metrics.revenueChange)}
              <span className={cn(
                reportData.metrics.revenueChange > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(reportData.metrics.revenueChange)}%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(reportData.metrics.profit / 1000).toFixed(0)}K
            </div>
            <div className="flex items-center gap-1 text-xs">
              {getChangeIcon(reportData.metrics.profitChange)}
              <span className={cn(
                reportData.metrics.profitChange > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(reportData.metrics.profitChange)}%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.metrics.projects}</div>
            <div className="flex items-center gap-1 text-xs">
              {getChangeIcon(reportData.metrics.projectsChange)}
              <span className={cn(
                reportData.metrics.projectsChange > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(reportData.metrics.projectsChange)}%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.metrics.tasks}</div>
            <div className="flex items-center gap-1 text-xs">
              {getChangeIcon(reportData.metrics.tasksChange)}
              <span className={cn(
                reportData.metrics.tasksChange > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(reportData.metrics.tasksChange)}%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.metrics.teamUtilization}%</div>
            <div className="flex items-center gap-1 text-xs">
              {getChangeIcon(reportData.metrics.utilizationChange)}
              <span className={cn(
                reportData.metrics.utilizationChange > 0 ? "text-green-600" : "text-red-600"
              )}>
                {Math.abs(reportData.metrics.utilizationChange)}%
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.metrics.customerSatisfaction}</div>
            <div className="flex items-center gap-1 text-xs">
              {getChangeIcon(reportData.metrics.satisfactionChange)}
              <span className={cn(
                reportData.metrics.satisfactionChange > 0 ? "text-green-600" : "text-red-600"
              )}>
                +{reportData.metrics.satisfactionChange}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="data">Data Tables</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue vs target</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={reportData.charts.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Distribution by status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={reportData.charts.projects}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, percentage }) => `${status}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {reportData.charts.projects.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Projects Performance</CardTitle>
              <CardDescription>Revenue and completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.tables.topProjects.map((project, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.client}</TableCell>
                      <TableCell>${(project.revenue / 1000).toFixed(0)}K</TableCell>
                      <TableCell>
                        <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.completion} className="w-20" />
                          <span className="text-sm">{project.completion}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Hours worked and efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportData.charts.team}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="member" angle={-45} textAnchor="end" height={100} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="hours" fill="#3b82f6" name="Hours" />
                    <Bar yAxisId="right" dataKey="efficiency" fill="#10b981" name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Completion Trend</CardTitle>
                <CardDescription>Weekly task progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reportData.charts.tasks}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Detailed revenue analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={reportData.charts.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Actual Revenue" />
                  <Bar dataKey="target" fill="#10b981" name="Target Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tables Tab */}
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Details</CardTitle>
              <CardDescription>Individual team member metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                    <TableHead>Efficiency</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.tables.teamPerformance.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {member.member.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.member}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.tasksCompleted}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={member.efficiency} className="w-20" />
                          <span className="text-sm">{member.efficiency}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.rating}/5.0</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/team/${member.member.replace(' ', '')}`)}
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Raw Data</CardTitle>
              <CardDescription>Download report data in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" onClick={() => handleExport('CSV')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as CSV
                </Button>
                <Button variant="outline" onClick={() => handleExport('Excel')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as Excel
                </Button>
                <Button variant="outline" onClick={() => handleExport('JSON')}>
                  <FileJson className="mr-2 h-4 w-4" />
                  Export as JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Revenue exceeded target by 3.5% this quarter, driven primarily by the Mobile Banking App project.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Users className="h-4 w-4" />
                  <AlertDescription>
                    Team utilization improved by 8% compared to last quarter, with optimal resource allocation.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    Project completion rate reached 62.5%, exceeding the quarterly goal of 60%.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Consider increasing team capacity by 15% to handle the growing project pipeline.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Focus on improving task completion rates, which decreased by 5% this quarter.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Maintain current client satisfaction strategies - rating improved to 4.6/5.0.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comments & Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(comment.timestamp, "MMM dd 'at' HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex gap-2">
                <Input placeholder="Add a comment..." />
                <Button size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Share History</CardTitle>
                <CardDescription>Report sharing activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.shareHistory.map((share) => (
                    <div key={share.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{share.sharedWith}</p>
                        <p className="text-xs text-muted-foreground">
                          Shared by {share.sharedBy} • {format(share.date, "MMM dd, yyyy")}
                        </p>
                      </div>
                      <Badge variant="outline">{share.permissions}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
                <CardDescription>Report export activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reportData.exportHistory.map((export_) => (
                    <div key={export_.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{export_.format} Export</p>
                        <p className="text-xs text-muted-foreground">
                          By {export_.exportedBy} • {format(export_.date, "MMM dd, yyyy")}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">{export_.size}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Report</DialogTitle>
            <DialogDescription>
              Choose export format and options
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Format</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Include</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Charts & Visualizations</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Data Tables</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Insights & Recommendations</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleExport('PDF')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Report</DialogTitle>
            <DialogDescription>
              Share this report with team members
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="share-email">Email addresses</Label>
              <Input
                id="share-email"
                placeholder="Enter email addresses separated by commas"
              />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <Select defaultValue="view">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View Only</SelectItem>
                  <SelectItem value="comment">View & Comment</SelectItem>
                  <SelectItem value="edit">Full Edit Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="share-message">Message (optional)</Label>
              <Textarea
                id="share-message"
                placeholder="Add a message..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this report? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}