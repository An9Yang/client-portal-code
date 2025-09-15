/**
 * Dashboard Page - Professional shadcn style dashboard
 * Unified version following shadcn.com design principles
 * Enhanced with data linkage to Analytics and Reports
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  DollarSign,
  Activity,
  MoreHorizontal,
  Download,
  Calendar,
  Clock,
  CircleDot,
  ArrowRight,
  FileText,
  BarChart3,
  FileBarChart,
  AlertCircle
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  // Metrics data - aligned with Analytics page
  const metrics = [
    {
      title: "Monthly Revenue",
      value: "$125,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "from last month",
      link: "/analytics",
      linkText: "View Analytics"
    },
    {
      title: "Active Projects",
      value: "24",
      change: "+3",
      trend: "up",
      icon: Briefcase,
      description: "this week",
      link: "/projects",
      linkText: "Manage Projects"
    },
    {
      title: "Team Utilization",
      value: "78%",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      description: "efficiency rate",
      link: "/analytics",
      linkText: "Team Analytics"
    },
    {
      title: "Client Satisfaction",
      value: "4.8/5",
      change: "+0.3",
      trend: "up",
      icon: Activity,
      description: "average rating",
      link: "/analytics",
      linkText: "Client Insights"
    }
  ];

  const recentProjects = [
    {
      name: "Website Redesign",
      client: "TechCorp",
      progress: 75,
      status: "active",
      deadline: "Dec 15, 2024",
      priority: "high"
    },
    {
      name: "Mobile App Development",
      client: "StartupXYZ",
      progress: 40,
      status: "active",
      deadline: "Jan 20, 2025",
      priority: "medium"
    },
    {
      name: "Marketing Campaign",
      client: "RetailPlus",
      progress: 100,
      status: "completed",
      deadline: "Nov 30, 2024",
      priority: "low"
    },
    {
      name: "Data Migration",
      client: "FinanceHub",
      progress: 15,
      status: "planning",
      deadline: "Feb 10, 2025",
      priority: "medium"
    }
  ];

  const upcomingTasks = [
    { task: "Review Q4 Reports", due: "Today", priority: "high", assignee: "You", type: "report" },
    { task: "Client Meeting - TechCorp", due: "Tomorrow", priority: "medium", assignee: "Team", type: "meeting" },
    { task: "Submit Project Proposal", due: "Dec 10", priority: "high", assignee: "You", type: "project" },
    { task: "Team Performance Reviews", due: "Dec 12", priority: "low", assignee: "You", type: "review" }
  ];

  // Recent reports - linked to Reports page
  const recentReports = [
    {
      name: "Q4 Executive Summary",
      type: "Executive",
      generated: "2 hours ago",
      status: "ready",
      size: "2.4 MB"
    },
    {
      name: "Financial Performance Report",
      type: "Financial",
      generated: "Yesterday",
      status: "ready",
      size: "1.8 MB"
    },
    {
      name: "Project Status Update",
      type: "Project",
      generated: "3 days ago",
      status: "ready",
      size: "3.1 MB"
    }
  ];

  // Key insights - from Analytics
  const keyInsights = [
    {
      title: "Revenue Target",
      current: 125450,
      target: 150000,
      percentage: 84,
      status: "on-track"
    },
    {
      title: "Project Delivery",
      current: 89,
      target: 95,
      percentage: 89,
      status: "warning"
    },
    {
      title: "Client Retention",
      current: 92,
      target: 90,
      percentage: 102,
      status: "exceeded"
    }
  ];

  const teamActivity = [
    { user: "Sarah Wilson", action: "completed", item: "Homepage mockup", time: "2 hours ago", avatar: "SW" },
    { user: "Michael Chen", action: "commented on", item: "API documentation", time: "3 hours ago", avatar: "MC" },
    { user: "Emma Rodriguez", action: "uploaded", item: "Brand guidelines v2", time: "5 hours ago", avatar: "ER" },
    { user: "Alex Johnson", action: "created", item: "Sprint planning board", time: "Yesterday", avatar: "AJ" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'completed': return 'bg-slate-50 text-slate-700 border-slate-200';
      case 'planning': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name?.split(' ')[0]}. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/reports')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/analytics')}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Metrics Cards - Interactive */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="cursor-pointer transition-all hover:shadow-md"
            onClick={() => metric.link && navigate(metric.link)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
                {' '}{metric.description}
              </p>
              {metric.linkText && (
                <div className="flex items-center gap-1 mt-3 text-xs text-primary hover:underline">
                  {metric.linkText}
                  <ArrowRight className="h-3 w-3" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Insights Bar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>
                Track progress against your business targets
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/analytics')}
            >
              View All Analytics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {keyInsights.map((insight, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{insight.title}</span>
                  <Badge
                    variant={insight.status === 'exceeded' ? 'default' :
                            insight.status === 'warning' ? 'secondary' : 'outline'}
                    className={insight.status === 'exceeded' ? 'bg-green-50 text-green-700' :
                              insight.status === 'warning' ? 'bg-amber-50 text-amber-700' : ''}
                  >
                    {insight.percentage}%
                  </Badge>
                </div>
                <Progress value={insight.percentage} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>${insight.current.toLocaleString()}</span>
                  <span>Target: ${insight.target.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Projects Table */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                  A list of your recent projects and their status.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/projects')}
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Project</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Progress</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.client}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {project.deadline}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {task.task}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{task.due}</span>
                      <span>·</span>
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Recent Reports</CardTitle>
                  <CardDescription>Generated reports ready for download</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/reports')}
                >
                  <FileBarChart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                     onClick={() => navigate('/reports')}>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {report.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="px-1.5 py-0">
                          {report.type}
                        </Badge>
                        <span>·</span>
                        <span>{report.generated}</span>
                      </div>
                    </div>
                  </div>
                  <Download className="h-3 w-3 text-muted-foreground" />
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                size="sm"
                onClick={() => navigate('/reports')}
              >
                <FileText className="mr-2 h-3 w-3" />
                Create New Report
              </Button>
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="text-muted-foreground">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}