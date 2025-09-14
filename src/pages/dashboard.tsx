/**
 * Dashboard Page - Professional shadcn style dashboard
 * Unified version following shadcn.com design principles
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
  CircleDot
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";

export default function Dashboard() {
  const { user } = useAuthStore();

  // Metrics data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "from last month"
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Briefcase,
      description: "this week"
    },
    {
      title: "Team Members",
      value: "48",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      description: "growth rate"
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      description: "vs last week"
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
    { task: "Review Q4 Reports", due: "Today", priority: "high", assignee: "You" },
    { task: "Client Meeting - TechCorp", due: "Tomorrow", priority: "medium", assignee: "Team" },
    { task: "Submit Project Proposal", due: "Dec 10", priority: "high", assignee: "You" },
    { task: "Team Performance Reviews", due: "Dec 12", priority: "low", assignee: "You" }
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
          <Select defaultValue="7days">
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
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
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
            </CardContent>
          </Card>
        ))}
      </div>

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
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
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