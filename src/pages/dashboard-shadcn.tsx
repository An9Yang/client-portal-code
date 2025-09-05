/**
 * Dashboard Page - Modern Shadcn/UI dashboard with analytics
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MoreVertical,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Target
} from "lucide-react";

export default function DashboardShadcn() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this week",
      trend: "up",
      icon: Briefcase,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Team Members",
      value: "48",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const recentProjects = [
    { 
      name: "Website Redesign", 
      client: "TechCorp", 
      progress: 75, 
      status: "In Progress",
      deadline: "Dec 15, 2024",
      team: 5
    },
    { 
      name: "Mobile App Development", 
      client: "StartupXYZ", 
      progress: 40, 
      status: "In Progress",
      deadline: "Jan 20, 2025",
      team: 8
    },
    { 
      name: "Marketing Campaign", 
      client: "RetailPlus", 
      progress: 100, 
      status: "Completed",
      deadline: "Nov 30, 2024",
      team: 3
    },
    { 
      name: "Data Migration", 
      client: "FinanceHub", 
      progress: 15, 
      status: "Planning",
      deadline: "Feb 10, 2025",
      team: 4
    }
  ];

  const upcomingTasks = [
    { task: "Review Q4 Reports", due: "Today", priority: "high" },
    { task: "Client Meeting - TechCorp", due: "Tomorrow", priority: "medium" },
    { task: "Submit Project Proposal", due: "Dec 10", priority: "high" },
    { task: "Team Performance Reviews", due: "Dec 12", priority: "low" }
  ];

  const teamActivity = [
    { user: "Sarah Wilson", action: "completed", item: "Homepage mockup", time: "2 hours ago" },
    { user: "Michael Chen", action: "commented on", item: "API documentation", time: "3 hours ago" },
    { user: "Emma Rodriguez", action: "uploaded", item: "Brand guidelines v2", time: "5 hours ago" },
    { user: "Alex Johnson", action: "created", item: "Sprint planning board", time: "Yesterday" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Welcome back, {user.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-600 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                  <metric.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-rose-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      metric.trend === "up" ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-gradient-to-r from-slate-100/50 to-slate-200/50 blur-2xl"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Projects - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Your active and recent projects</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <Badge 
                          variant={project.status === "Completed" ? "default" : project.status === "Planning" ? "secondary" : "outline"}
                          className={
                            project.status === "Completed" 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : project.status === "Planning"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : ""
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {project.client}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.team}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-4">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${
                      task.priority === "high" ? "bg-rose-500" :
                      task.priority === "medium" ? "bg-amber-500" :
                      "bg-slate-400"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Due {task.due}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View all tasks
              </Button>
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent actions by your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 text-sm">
                      <p>
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-slate-600">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.item}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Track your key performance indicators</CardDescription>
            </div>
            <Tabs defaultValue="week" className="w-auto">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-slate-500">
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">Performance chart will be displayed here</p>
              <p className="text-xs text-slate-400 mt-1">Integration with chart library pending</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}