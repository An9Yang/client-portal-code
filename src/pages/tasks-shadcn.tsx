/**
 * Tasks Page - Comprehensive task management with filters and views
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
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Flag,
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  Target,
  TrendingUp,
  Activity,
  ListTodo,
  KanbanSquare
} from "lucide-react";

export default function TasksShadcn() {
  const taskStats = [
    {
      title: "Total Tasks",
      value: "156",
      change: "+12 this week",
      icon: ListTodo,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "In Progress",
      value: "23",
      change: "5 due today",
      icon: Play,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Completed",
      value: "89",
      change: "+8 this week",
      icon: CheckCircle,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Overdue",
      value: "4",
      change: "-2 resolved",
      icon: AlertCircle,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const allTasks = [
    {
      id: 1,
      title: "Implement user authentication system",
      description: "Set up JWT authentication with login, logout, and password reset functionality",
      project: "Website Redesign",
      assignee: "Alex Johnson",
      priority: "high",
      status: "in-progress",
      dueDate: "Dec 8, 2024",
      progress: 70,
      tags: ["backend", "security"]
    },
    {
      id: 2,
      title: "Design mobile navigation component",
      description: "Create responsive navigation component for mobile devices",
      project: "Mobile App Development",
      assignee: "Emma Rodriguez",
      priority: "high",
      status: "in-progress",
      dueDate: "Dec 6, 2024",
      progress: 45,
      tags: ["design", "mobile"]
    },
    {
      id: 3,
      title: "Write API documentation",
      description: "Document all REST API endpoints with examples and usage guidelines",
      project: "Website Redesign",
      assignee: "Michael Chen",
      priority: "medium",
      status: "todo",
      dueDate: "Dec 10, 2024",
      progress: 0,
      tags: ["documentation", "api"]
    },
    {
      id: 4,
      title: "Set up CI/CD pipeline",
      description: "Configure automated testing and deployment pipeline",
      project: "E-commerce Platform",
      assignee: "Sarah Wilson",
      priority: "medium",
      status: "todo",
      dueDate: "Dec 12, 2024",
      progress: 15,
      tags: ["devops", "automation"]
    },
    {
      id: 5,
      title: "Optimize database queries",
      description: "Review and optimize slow database queries for better performance",
      project: "Data Migration",
      assignee: "Michael Chen",
      priority: "low",
      status: "completed",
      dueDate: "Nov 30, 2024",
      progress: 100,
      tags: ["database", "performance"]
    },
    {
      id: 6,
      title: "Create user onboarding flow",
      description: "Design and implement guided user onboarding experience",
      project: "Mobile App Development",
      assignee: "Lisa Chang",
      priority: "high",
      status: "review",
      dueDate: "Dec 5, 2024",
      progress: 90,
      tags: ["ux", "onboarding"]
    },
    {
      id: 7,
      title: "Update brand guidelines",
      description: "Revise brand guidelines to match new design system",
      project: "Brand Identity Redesign",
      assignee: "David Kim",
      priority: "low",
      status: "overdue",
      dueDate: "Nov 25, 2024",
      progress: 60,
      tags: ["design", "branding"]
    },
    {
      id: 8,
      title: "Security audit and testing",
      description: "Conduct comprehensive security testing and vulnerability assessment",
      project: "E-commerce Platform",
      assignee: "Tom Wilson",
      priority: "high",
      status: "todo",
      dueDate: "Dec 15, 2024",
      progress: 0,
      tags: ["security", "testing"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "review":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "todo":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "overdue":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-rose-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-slate-400";
      default:
        return "bg-slate-400";
    }
  };

  const todoTasks = allTasks.filter(t => t.status === "todo");
  const inProgressTasks = allTasks.filter(t => t.status === "in-progress");
  const reviewTasks = allTasks.filter(t => t.status === "review");
  const completedTasks = allTasks.filter(t => t.status === "completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Task Management
          </h1>
          <p className="text-slate-600 mt-1">Organize and track all your tasks in one place</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {taskStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.change}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Task Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-slate-600" />
              Task Overview
            </CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <KanbanSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Tasks ({allTasks.length})</TabsTrigger>
              <TabsTrigger value="todo">To Do ({todoTasks.length})</TabsTrigger>
              <TabsTrigger value="progress">In Progress ({inProgressTasks.length})</TabsTrigger>
              <TabsTrigger value="review">Review ({reviewTasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-6">
              <div className="space-y-4">
                {allTasks.map((task) => (
                  <div key={task.id} className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-16 rounded-full ${getPriorityColor(task.priority)}`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <p className="text-slate-600 text-sm mt-1">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">Due {task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{task.project}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Flag className="w-4 h-4 text-slate-400" />
                        <span className={`capitalize ${
                          task.priority === "high" ? "text-rose-600" :
                          task.priority === "medium" ? "text-amber-600" : "text-slate-600"
                        }`}>
                          {task.priority} priority
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-sm text-slate-600">Assigned to {task.assignee}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="todo" className="space-y-4 mt-6">
              <div className="space-y-4">
                {todoTasks.map((task) => (
                  <div key={task.id} className="border border-slate-200 rounded-lg p-4 border-l-4 border-l-slate-400">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>To Do</Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">Due: {task.dueDate}</div>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Start Task
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4 mt-6">
              <div className="space-y-4">
                {inProgressTasks.map((task) => (
                  <div key={task.id} className="border border-slate-200 rounded-lg p-4 border-l-4 border-l-blue-500">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>In Progress</Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-slate-600">Progress: {task.progress}%</div>
                      <Progress value={task.progress} className="w-32 h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">Due: {task.dueDate}</div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="review" className="space-y-4 mt-6">
              <div className="space-y-4">
                {reviewTasks.map((task) => (
                  <div key={task.id} className="border border-slate-200 rounded-lg p-4 border-l-4 border-l-purple-500">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>Review</Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">Ready for review - {task.progress}% complete</div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 mt-6">
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div key={task.id} className="border border-slate-200 rounded-lg p-4 border-l-4 border-l-emerald-500 opacity-75">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>Completed</Badge>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">Completed: {task.dueDate}</div>
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}