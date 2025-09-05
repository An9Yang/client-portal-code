/**
 * Project Detail Page - Detailed view of a specific project
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
  ArrowLeft,
  Users,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Settings,
  FileText,
  MessageSquare,
  Upload,
  Download,
  Eye,
  Edit,
  MoreVertical,
  Target,
  TrendingUp,
  Activity
} from "lucide-react";

export default function ProjectDetailShadcn() {
  const project = {
    id: 1,
    name: "Website Redesign",
    client: "TechCorp Inc.",
    status: "in-progress",
    priority: "high",
    progress: 75,
    budget: 45000,
    spent: 33750,
    startDate: "Oct 15, 2024",
    deadline: "Dec 15, 2024",
    estimatedHours: 320,
    loggedHours: 240,
    description: "Complete website overhaul with modern design and improved user experience. This includes responsive design, performance optimization, SEO improvements, and content management system integration.",
    team: [
      { name: "Sarah Wilson", role: "Project Manager", avatar: "SW", status: "active" },
      { name: "Michael Chen", role: "Lead Developer", avatar: "MC", status: "active" },
      { name: "Emma Rodriguez", role: "UI/UX Designer", avatar: "ER", status: "active" },
      { name: "Alex Johnson", role: "Backend Developer", avatar: "AJ", status: "busy" }
    ]
  };

  const projectMetrics = [
    {
      title: "Budget Utilization",
      value: `$${project.spent.toLocaleString()}`,
      subtitle: `of $${project.budget.toLocaleString()}`,
      percentage: (project.spent / project.budget) * 100,
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Time Progress",
      value: `${project.loggedHours}h`,
      subtitle: `of ${project.estimatedHours}h estimated`,
      percentage: (project.loggedHours / project.estimatedHours) * 100,
      icon: Clock,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Task Completion",
      value: `${project.progress}%`,
      subtitle: "tasks completed",
      percentage: project.progress,
      icon: Target,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Team Efficiency",
      value: "92%",
      subtitle: "performance rate",
      percentage: 92,
      icon: TrendingUp,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const tasks = [
    { id: 1, title: "Design Homepage Mockup", status: "completed", assignee: "Emma Rodriguez", dueDate: "Nov 1, 2024", priority: "high" },
    { id: 2, title: "Develop Navigation Component", status: "completed", assignee: "Michael Chen", dueDate: "Nov 5, 2024", priority: "high" },
    { id: 3, title: "Implement User Authentication", status: "in-progress", assignee: "Alex Johnson", dueDate: "Dec 1, 2024", priority: "high" },
    { id: 4, title: "Content Migration", status: "in-progress", assignee: "Sarah Wilson", dueDate: "Dec 5, 2024", priority: "medium" },
    { id: 5, title: "Performance Optimization", status: "pending", assignee: "Michael Chen", dueDate: "Dec 10, 2024", priority: "medium" },
    { id: 6, title: "Final Testing & QA", status: "pending", assignee: "Team", dueDate: "Dec 12, 2024", priority: "high" }
  ];

  const milestones = [
    { title: "Project Kickoff", date: "Oct 15, 2024", status: "completed", description: "Project initiation and team setup" },
    { title: "Design Phase Complete", date: "Nov 10, 2024", status: "completed", description: "All design mockups approved" },
    { title: "Development Phase", date: "Dec 1, 2024", status: "in-progress", description: "Core development implementation" },
    { title: "Testing & Launch", date: "Dec 15, 2024", status: "upcoming", description: "Final testing and production deployment" }
  ];

  const recentActivity = [
    { user: "Michael Chen", action: "completed", item: "Navigation component", time: "2 hours ago" },
    { user: "Emma Rodriguez", action: "uploaded", item: "Final homepage design", time: "4 hours ago" },
    { user: "Sarah Wilson", action: "commented on", item: "Content migration task", time: "6 hours ago" },
    { user: "Alex Johnson", action: "started", item: "User authentication module", time: "Yesterday" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {project.name}
            </h1>
            <Badge className={getStatusColor(project.status)}>
              {project.status.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {project.priority} priority
            </Badge>
          </div>
          <p className="text-slate-600">{project.client} • Due {project.deadline}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Project
          </Button>
        </div>
      </div>

      {/* Project Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projectMetrics.map((metric, index) => (
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
              <div className="space-y-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-xs text-slate-500">{metric.subtitle}</div>
                <Progress value={metric.percentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed mb-6">{project.description}</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Start Date: {project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Duration: 8 weeks</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Budget: ${project.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">Team Size: {project.team.length} members</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Tabs */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="tasks" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tasks" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Project Tasks</h3>
                    <Button size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            task.status === "completed" ? "bg-emerald-500" :
                            task.status === "in-progress" ? "bg-blue-500" : "bg-slate-400"
                          }`} />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>Assigned to {task.assignee}</span>
                              <span>Due {task.dueDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {task.priority}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="milestones" className="space-y-4 mt-6">
                  <h3 className="font-semibold">Project Milestones</h3>
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${
                            milestone.status === "completed" ? "bg-emerald-500" :
                            milestone.status === "in-progress" ? "bg-blue-500" : "bg-slate-400"
                          }`} />
                          {index < milestones.length - 1 && <div className="w-px h-12 bg-slate-200 mt-2" />}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{milestone.title}</h4>
                            <span className="text-sm text-slate-500">{milestone.date}</span>
                          </div>
                          <p className="text-sm text-slate-600">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="files" className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Project Files</h3>
                    <Button size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="text-sm text-slate-500">No files uploaded yet</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Upload Files
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-4 mt-6">
                  <h3 className="font-semibold">Project Timeline</h3>
                  <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                    <div className="text-center">
                      <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="text-sm text-slate-500">Timeline visualization will be displayed here</p>
                      <p className="text-xs text-slate-400 mt-1">Gantt chart or timeline view</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Team & Activity */}
        <div className="space-y-6">
          {/* Project Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold mb-2">{project.progress}%</div>
                <Progress value={project.progress} className="h-3" />
              </div>
              <div className="text-sm text-slate-600 text-center">
                {Math.ceil((100 - project.progress) / 10)} days remaining
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.team.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-slate-600">{member.role}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      member.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                    }`} />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Team Chat
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
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
              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}