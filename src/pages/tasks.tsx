/**
 * Tasks Page - Comprehensive task management with kanban board
 * Connects with Projects and Team for complete workflow management
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus, Search, Filter, LayoutGrid, List, MoreVertical,
  Calendar, Users, Clock, AlertCircle, CheckCircle2,
  MessageSquare, Paperclip, Tag, Flag, ArrowRight,
  CircleDot, Circle, CheckCircle, XCircle, Timer,
  TrendingUp, Activity, BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  project: string;
  assignee: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  attachments: number;
  comments: number;
  createdAt: string;
  completedAt?: string;
}

export default function Tasks() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [filterProject, setFilterProject] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Task data aligned with Projects
  const tasks: Task[] = [
    // E-Commerce Platform tasks
    {
      id: 1,
      title: "Implement payment gateway integration",
      description: "Integrate Stripe payment processing with webhook handling",
      status: "in-progress",
      priority: "high",
      project: "E-Commerce Platform",
      assignee: "SW",
      dueDate: "2024-12-10",
      estimatedHours: 16,
      actualHours: 12,
      tags: ["backend", "payment", "api"],
      attachments: 3,
      comments: 5,
      createdAt: "2024-11-20",
    },
    {
      id: 2,
      title: "Design product catalog UI",
      description: "Create responsive product grid with filtering and sorting",
      status: "review",
      priority: "medium",
      project: "E-Commerce Platform",
      assignee: "MC",
      dueDate: "2024-12-08",
      estimatedHours: 8,
      actualHours: 7,
      tags: ["frontend", "ui", "design"],
      attachments: 2,
      comments: 3,
      createdAt: "2024-11-18",
    },
    {
      id: 3,
      title: "Setup inventory management system",
      description: "Build real-time inventory tracking with low stock alerts",
      status: "todo",
      priority: "high",
      project: "E-Commerce Platform",
      assignee: "ER",
      dueDate: "2024-12-15",
      estimatedHours: 20,
      actualHours: 0,
      tags: ["backend", "database", "feature"],
      attachments: 1,
      comments: 2,
      createdAt: "2024-11-25",
    },
    // Mobile Banking App tasks
    {
      id: 4,
      title: "Implement biometric authentication",
      description: "Add Face ID and fingerprint authentication for iOS and Android",
      status: "in-progress",
      priority: "urgent",
      project: "Mobile Banking App",
      assignee: "MC",
      dueDate: "2024-12-05",
      estimatedHours: 24,
      actualHours: 18,
      tags: ["mobile", "security", "feature"],
      attachments: 4,
      comments: 8,
      createdAt: "2024-11-15",
    },
    {
      id: 5,
      title: "Create transaction history view",
      description: "Design and implement transaction list with search and filters",
      status: "done",
      priority: "medium",
      project: "Mobile Banking App",
      assignee: "DL",
      dueDate: "2024-11-30",
      estimatedHours: 12,
      actualHours: 11,
      tags: ["mobile", "ui", "feature"],
      attachments: 2,
      comments: 4,
      createdAt: "2024-11-10",
      completedAt: "2024-11-29",
    },
    {
      id: 6,
      title: "Security audit preparation",
      description: "Prepare documentation and fix vulnerabilities for security audit",
      status: "todo",
      priority: "urgent",
      project: "Mobile Banking App",
      assignee: "ER",
      dueDate: "2024-12-12",
      estimatedHours: 16,
      actualHours: 0,
      tags: ["security", "documentation", "compliance"],
      attachments: 5,
      comments: 3,
      createdAt: "2024-11-28",
    },
    // Learning Platform tasks
    {
      id: 7,
      title: "Implement video streaming service",
      description: "Setup adaptive bitrate streaming with CDN integration",
      status: "in-progress",
      priority: "high",
      project: "Learning Platform",
      assignee: "MC",
      dueDate: "2024-12-20",
      estimatedHours: 32,
      actualHours: 20,
      tags: ["backend", "video", "infrastructure"],
      attachments: 3,
      comments: 6,
      createdAt: "2024-11-22",
    },
    {
      id: 8,
      title: "Build quiz engine",
      description: "Create interactive quiz system with various question types",
      status: "review",
      priority: "medium",
      project: "Learning Platform",
      assignee: "SW",
      dueDate: "2024-12-18",
      estimatedHours: 16,
      actualHours: 14,
      tags: ["frontend", "feature", "interactive"],
      attachments: 2,
      comments: 4,
      createdAt: "2024-11-24",
    },
    {
      id: 9,
      title: "Design course progress tracking",
      description: "Implement progress bars and completion certificates",
      status: "todo",
      priority: "low",
      project: "Learning Platform",
      assignee: "AJ",
      dueDate: "2024-12-25",
      estimatedHours: 8,
      actualHours: 0,
      tags: ["frontend", "ui", "analytics"],
      attachments: 1,
      comments: 1,
      createdAt: "2024-11-26",
    },
    // Healthcare Portal tasks
    {
      id: 10,
      title: "Create appointment booking system",
      description: "Build calendar-based appointment scheduling with reminders",
      status: "todo",
      priority: "high",
      project: "Healthcare Portal",
      assignee: "ER",
      dueDate: "2025-01-10",
      estimatedHours: 24,
      actualHours: 0,
      tags: ["feature", "calendar", "notifications"],
      attachments: 3,
      comments: 5,
      createdAt: "2024-11-25",
    },
    {
      id: 11,
      title: "Patient data encryption",
      description: "Implement end-to-end encryption for patient records",
      status: "todo",
      priority: "urgent",
      project: "Healthcare Portal",
      assignee: "DL",
      dueDate: "2025-01-05",
      estimatedHours: 20,
      actualHours: 0,
      tags: ["security", "backend", "compliance"],
      attachments: 2,
      comments: 3,
      createdAt: "2024-11-27",
    },
    // General/Misc tasks
    {
      id: 12,
      title: "Update documentation",
      description: "Update API documentation and user guides",
      status: "done",
      priority: "low",
      project: "General",
      assignee: "AJ",
      dueDate: "2024-11-28",
      estimatedHours: 4,
      actualHours: 3,
      tags: ["documentation"],
      attachments: 1,
      comments: 1,
      createdAt: "2024-11-20",
      completedAt: "2024-11-27",
    },
  ];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesProject = filterProject === "all" || task.project === filterProject;
    const matchesAssignee = filterAssignee === "all" || task.assignee === filterAssignee;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProject && matchesAssignee && matchesSearch;
  });

  // Group tasks by status for kanban view
  const tasksByStatus = {
    todo: filteredTasks.filter(t => t.status === "todo"),
    "in-progress": filteredTasks.filter(t => t.status === "in-progress"),
    review: filteredTasks.filter(t => t.status === "review"),
    done: filteredTasks.filter(t => t.status === "done"),
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    review: tasks.filter(t => t.status === "review").length,
    done: tasks.filter(t => t.status === "done").length,
    overdue: tasks.filter(t =>
      t.status !== "done" && new Date(t.dueDate) < new Date()
    ).length,
    completionRate: Math.round(
      (tasks.filter(t => t.status === "done").length / tasks.length) * 100
    ),
  };

  // Get unique projects and assignees for filters
  const projects = Array.from(new Set(tasks.map(t => t.project)));
  const assignees = Array.from(new Set(tasks.map(t => t.assignee)));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return <Circle className="h-4 w-4 text-gray-400" />;
      case 'in-progress': return <CircleDot className="h-4 w-4 text-blue-600" />;
      case 'review': return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'done': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return null;
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              {getStatusIcon(task.status)}
              <h4 className="font-medium text-sm line-clamp-1">{task.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline" className={getPriorityColor(task.priority)}>
            {task.priority === 'urgent' && <Flag className="h-3 w-3 mr-1" />}
            {task.priority}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {task.project}
          </Badge>
        </div>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <Tag className="h-2 w-2 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {task.estimatedHours}h
            </span>
          </div>
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {task.attachments > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {task.attachments}
            </span>
          )}
          {task.comments > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {task.comments}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all project tasks in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Projects
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todo}</div>
            <p className="text-xs text-muted-foreground">Pending start</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Active tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.review}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.done}</div>
            <p className="text-xs text-muted-foreground">Done tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-600 mr-1" />
              +5% this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterProject} onValueChange={setFilterProject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map(project => (
              <SelectItem key={project} value={project}>{project}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAssignee} onValueChange={setFilterAssignee}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All assignees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            {assignees.map(assignee => (
              <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "kanban" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tasks Display */}
      {viewMode === "kanban" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* To Do Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <Circle className="h-4 w-4 text-gray-400" />
                To Do
                <Badge variant="secondary" className="ml-1">
                  {tasksByStatus.todo.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {tasksByStatus.todo.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* In Progress Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <CircleDot className="h-4 w-4 text-blue-600" />
                In Progress
                <Badge variant="secondary" className="ml-1">
                  {tasksByStatus["in-progress"].length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {tasksByStatus["in-progress"].map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Review Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Review
                <Badge variant="secondary" className="ml-1">
                  {tasksByStatus.review.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {tasksByStatus.review.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Done Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Done
                <Badge variant="secondary" className="ml-1">
                  {tasksByStatus.done.length}
                </Badge>
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="space-y-3 pr-4">
                {tasksByStatus.done.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Task</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Project</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Priority</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Assignee</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Due Date</th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <p className="font-medium text-sm">{task.title}</p>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {task.description}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {task.project}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">
                          {task.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                        </Avatar>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}