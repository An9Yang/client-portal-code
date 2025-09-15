/**
 * Task Detail Page - Comprehensive task management interface
 * Shows detailed task information, subtasks, comments, attachments, and activity
 */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ArrowLeft, MoreVertical, Calendar as CalendarIcon, Clock, User, Users,
  CheckCircle2, AlertCircle, XCircle, Timer, Play, Pause, Square,
  MessageSquare, Paperclip, Link, Edit, Trash2, Plus, Download,
  FileText, Image, Archive, Eye, Send, Flag, Tag, GitBranch,
  Activity, TrendingUp, AlertTriangle, CheckSquare, ListTodo,
  FileUp, ExternalLink, Copy, Share2, Bookmark, Bell, BellOff,
  ChevronRight, ChevronDown, Target, Zap, Info, Settings
} from "lucide-react";

interface TaskData {
  id: string;
  title: string;
  description: string;
  project: {
    id: number;
    name: string;
    client: string;
  };
  status: "todo" | "in-progress" | "review" | "done" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  type: "feature" | "bug" | "improvement" | "research" | "documentation";
  assignee: {
    id: string;
    name: string;
    avatar?: string;
  };
  reporter: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate: Date;
  startDate: Date;
  estimatedHours: number;
  actualHours: number;
  progress: number;
  tags: string[];
  dependencies: string[];
  blockedBy: string[];
  subtasks: Array<{
    id: string;
    title: string;
    completed: boolean;
    assignee?: string;
    dueDate?: Date;
  }>;
  comments: Array<{
    id: string;
    author: string;
    authorAvatar?: string;
    content: string;
    timestamp: Date;
    edited?: boolean;
    attachments?: Array<{
      name: string;
      size: string;
      type: string;
    }>;
  }>;
  attachments: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    uploadedBy: string;
    uploadedAt: Date;
    preview?: string;
  }>;
  activity: Array<{
    id: string;
    type: "status_change" | "assignment" | "comment" | "attachment" | "edit" | "time_logged";
    user: string;
    description: string;
    timestamp: Date;
    details?: any;
  }>;
  timeTracking: Array<{
    id: string;
    user: string;
    date: Date;
    hours: number;
    description: string;
  }>;
  relatedTasks: Array<{
    id: string;
    title: string;
    status: string;
    type: "blocks" | "blocked_by" | "relates_to" | "duplicates";
  }>;
  customFields: {
    environment?: string;
    version?: string;
    component?: string;
    sprint?: string;
  };
}

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showTimeDialog, setShowTimeDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Mock task data
  const taskData: TaskData = {
    id: id || "TASK-001",
    title: "Implement user authentication flow",
    description: `Implement a complete user authentication flow including:

• Login page with email/password
• Registration with email verification
• Password reset functionality
• Remember me option
• Social login integration (Google, GitHub)
• Two-factor authentication setup
• Session management
• Logout functionality

The authentication should be secure, follow best practices, and integrate with the existing backend API.`,
    project: {
      id: 1,
      name: "E-commerce Platform",
      client: "TechCorp Inc."
    },
    status: "in-progress",
    priority: "high",
    type: "feature",
    assignee: {
      id: "SW",
      name: "Sarah Wilson",
    },
    reporter: {
      id: "AJ",
      name: "Alex Johnson",
    },
    dueDate: new Date("2024-02-15"),
    startDate: new Date("2024-02-01"),
    estimatedHours: 24,
    actualHours: 12,
    progress: 50,
    tags: ["authentication", "security", "frontend", "backend", "api"],
    dependencies: ["TASK-099", "TASK-100"],
    blockedBy: [],
    subtasks: [
      {
        id: "SUB-001",
        title: "Create login page UI",
        completed: true,
        assignee: "Sarah Wilson",
        dueDate: new Date("2024-02-05")
      },
      {
        id: "SUB-002",
        title: "Implement JWT token handling",
        completed: true,
        assignee: "Sarah Wilson",
        dueDate: new Date("2024-02-07")
      },
      {
        id: "SUB-003",
        title: "Add password reset flow",
        completed: false,
        assignee: "Sarah Wilson",
        dueDate: new Date("2024-02-10")
      },
      {
        id: "SUB-004",
        title: "Integrate social login providers",
        completed: false,
        assignee: "Michael Chen",
        dueDate: new Date("2024-02-12")
      },
      {
        id: "SUB-005",
        title: "Setup 2FA authentication",
        completed: false,
        assignee: "Sarah Wilson",
        dueDate: new Date("2024-02-14")
      }
    ],
    comments: [
      {
        id: "COM-001",
        author: "Alex Johnson",
        content: "Please prioritize the social login integration as per client request. They specifically want Google and GitHub OAuth.",
        timestamp: new Date("2024-02-02T10:30:00"),
        attachments: [
          {
            name: "oauth-requirements.pdf",
            size: "245 KB",
            type: "pdf"
          }
        ]
      },
      {
        id: "COM-002",
        author: "Sarah Wilson",
        content: "Login page UI is complete and ready for review. I've followed the design specs from Figma. JWT implementation is also done and tested.",
        timestamp: new Date("2024-02-07T14:15:00"),
        edited: true
      },
      {
        id: "COM-003",
        author: "Michael Chen",
        content: "I can help with the social login integration. I've worked with OAuth2 flows before. Will start on this tomorrow.",
        timestamp: new Date("2024-02-08T09:00:00")
      }
    ],
    attachments: [
      {
        id: "ATT-001",
        name: "authentication-flow.fig",
        size: "1.2 MB",
        type: "figma",
        uploadedBy: "Emma Rodriguez",
        uploadedAt: new Date("2024-02-01T09:00:00")
      },
      {
        id: "ATT-002",
        name: "api-documentation.md",
        size: "56 KB",
        type: "markdown",
        uploadedBy: "David Lee",
        uploadedAt: new Date("2024-02-01T10:30:00")
      },
      {
        id: "ATT-003",
        name: "security-checklist.xlsx",
        size: "128 KB",
        type: "excel",
        uploadedBy: "Alex Johnson",
        uploadedAt: new Date("2024-02-03T11:00:00")
      }
    ],
    activity: [
      {
        id: "ACT-001",
        type: "status_change",
        user: "Alex Johnson",
        description: "Created task",
        timestamp: new Date("2024-02-01T08:00:00"),
        details: { from: null, to: "todo" }
      },
      {
        id: "ACT-002",
        type: "assignment",
        user: "Alex Johnson",
        description: "Assigned to Sarah Wilson",
        timestamp: new Date("2024-02-01T08:05:00"),
        details: { assignee: "Sarah Wilson" }
      },
      {
        id: "ACT-003",
        type: "status_change",
        user: "Sarah Wilson",
        description: "Started working on task",
        timestamp: new Date("2024-02-01T09:00:00"),
        details: { from: "todo", to: "in-progress" }
      },
      {
        id: "ACT-004",
        type: "time_logged",
        user: "Sarah Wilson",
        description: "Logged 4 hours",
        timestamp: new Date("2024-02-05T17:00:00"),
        details: { hours: 4 }
      },
      {
        id: "ACT-005",
        type: "comment",
        user: "Michael Chen",
        description: "Added a comment",
        timestamp: new Date("2024-02-08T09:00:00")
      }
    ],
    timeTracking: [
      {
        id: "TIME-001",
        user: "Sarah Wilson",
        date: new Date("2024-02-01"),
        hours: 3,
        description: "Initial setup and login page design"
      },
      {
        id: "TIME-002",
        user: "Sarah Wilson",
        date: new Date("2024-02-05"),
        hours: 4,
        description: "Login page implementation"
      },
      {
        id: "TIME-003",
        user: "Sarah Wilson",
        date: new Date("2024-02-07"),
        hours: 5,
        description: "JWT token handling and testing"
      }
    ],
    relatedTasks: [
      {
        id: "TASK-099",
        title: "Setup backend API endpoints",
        status: "done",
        type: "blocks"
      },
      {
        id: "TASK-100",
        title: "Database schema for users",
        status: "done",
        type: "blocks"
      },
      {
        id: "TASK-102",
        title: "User profile management",
        status: "todo",
        type: "relates_to"
      }
    ],
    customFields: {
      environment: "Production",
      version: "2.0.0",
      component: "Authentication",
      sprint: "Sprint 14"
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <AlertCircle className="h-4 w-4" />;
      case 'feature': return <Zap className="h-4 w-4" />;
      case 'improvement': return <TrendingUp className="h-4 w-4" />;
      case 'research': return <Info className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    toast.success("Timer started");
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setShowTimeDialog(true);
  };

  const handleLogTime = () => {
    toast.success("Time logged successfully");
    setShowTimeDialog(false);
    setElapsedTime(0);
  };

  const handleDeleteTask = () => {
    toast.success("Task deleted");
    navigate("/tasks");
  };

  const completedSubtasks = taskData.subtasks.filter(st => st.completed).length;
  const subtaskProgress = (completedSubtasks / taskData.subtasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/tasks")}
          className="gap-2 px-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Tasks
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{taskData.id}</span>
      </div>

      {/* Task Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{taskData.title}</h1>
            <Badge className={cn(getStatusColor(taskData.status))}>
              {taskData.status}
            </Badge>
            <Badge className={cn(getPriorityColor(taskData.priority))}>
              <Flag className="mr-1 h-3 w-3" />
              {taskData.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {taskData.project.name}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              Assigned to {taskData.assignee.name}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              Due {format(taskData.dueDate, "MMM dd, yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isTimerRunning ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStopTimer}
              className="gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Timer
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartTimer}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Start Timer
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate Task
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GitBranch className="mr-2 h-4 w-4" />
                Create Subtask
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive Task
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share Task
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <div className="flex items-center gap-2">
                <Progress value={taskData.progress} className="flex-1" />
                <span className="text-sm font-medium">{taskData.progress}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Time Tracking</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold">{taskData.actualHours}</span>
                <span className="text-sm text-muted-foreground">/ {taskData.estimatedHours}h</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Subtasks</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold">{completedSubtasks}</span>
                <span className="text-sm text-muted-foreground">/ {taskData.subtasks.length}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Days Remaining</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold">
                  {Math.max(0, Math.ceil((taskData.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                </span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="attachments">Files</TabsTrigger>
          <TabsTrigger value="time">Time Log</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{taskData.description}</p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {taskData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {taskData.dependencies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Dependencies</h4>
                      <div className="space-y-1">
                        {taskData.dependencies.map((dep) => (
                          <div key={dep} className="flex items-center gap-2 text-sm">
                            <Link className="h-3 w-3 text-muted-foreground" />
                            <span className="text-blue-600 hover:underline cursor-pointer">
                              {dep}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(taskData.type)}
                        <span className="text-sm capitalize">{taskData.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reporter</span>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {taskData.reporter.id}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{taskData.reporter.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date</span>
                      <span className="text-sm">
                        {format(taskData.startDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Sprint</span>
                      <Badge variant="outline">{taskData.customFields.sprint}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Component</span>
                      <span className="text-sm">{taskData.customFields.component}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Version</span>
                      <span className="text-sm">{taskData.customFields.version}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Related Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {taskData.relatedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => navigate(`/tasks/${task.id}`)}
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {task.type.replace("_", " ")}
                          </Badge>
                          <span className="text-sm">{task.id}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            task.status === "done" && "bg-green-100 text-green-800"
                          )}
                        >
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Subtasks Tab */}
        <TabsContent value="subtasks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Subtasks</CardTitle>
                  <CardDescription>
                    {completedSubtasks} of {taskData.subtasks.length} completed
                  </CardDescription>
                </div>
                <Dialog open={showAddSubtask} onOpenChange={setShowAddSubtask}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Subtask
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Subtask</DialogTitle>
                      <DialogDescription>
                        Create a new subtask for this task
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="subtask-title">Title</Label>
                        <Input id="subtask-title" placeholder="Subtask title..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subtask-assignee">Assignee</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SW">Sarah Wilson</SelectItem>
                              <SelectItem value="MC">Michael Chen</SelectItem>
                              <SelectItem value="ER">Emma Rodriguez</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subtask-due">Due Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Select date
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowAddSubtask(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          toast.success("Subtask added");
                          setShowAddSubtask(false);
                        }}>
                          Add Subtask
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={subtaskProgress} className="mb-4" />
              <div className="space-y-2">
                {taskData.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={() => toast.success("Subtask updated")}
                      />
                      <div>
                        <p className={cn(
                          "text-sm font-medium",
                          subtask.completed && "line-through text-muted-foreground"
                        )}>
                          {subtask.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          {subtask.assignee && (
                            <span className="text-xs text-muted-foreground">
                              <User className="inline h-3 w-3 mr-1" />
                              {subtask.assignee}
                            </span>
                          )}
                          {subtask.dueDate && (
                            <span className="text-xs text-muted-foreground">
                              <CalendarIcon className="inline h-3 w-3 mr-1" />
                              {format(subtask.dueDate, "MMM dd")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Comments</CardTitle>
                <Button
                  size="sm"
                  onClick={() => setShowAddComment(!showAddComment)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add Comment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddComment && (
                <div className="space-y-3 mb-6 p-4 border rounded-lg">
                  <Textarea
                    placeholder="Write your comment..."
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddComment(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          toast.success("Comment added");
                          setShowAddComment(false);
                        }}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {taskData.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(comment.timestamp, "MMM dd, yyyy 'at' HH:mm")}
                        </span>
                        {comment.edited && (
                          <Badge variant="outline" className="text-xs">edited</Badge>
                        )}
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      {comment.attachments && comment.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {comment.attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"
                            >
                              <Paperclip className="h-3 w-3" />
                              <span>{attachment.name}</span>
                              <span className="text-muted-foreground">({attachment.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attachments Tab */}
        <TabsContent value="attachments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Attachments</CardTitle>
                <Button size="sm">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {taskData.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded flex items-center justify-center bg-muted">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{attachment.size}</span>
                          <span>•</span>
                          <span>Uploaded by {attachment.uploadedBy}</span>
                          <span>•</span>
                          <span>{format(attachment.uploadedAt, "MMM dd, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time Tracking Tab */}
        <TabsContent value="time" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Time Tracking</CardTitle>
                  <CardDescription>
                    {taskData.actualHours} of {taskData.estimatedHours} hours logged
                  </CardDescription>
                </div>
                <Dialog open={showTimeDialog} onOpenChange={setShowTimeDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Clock className="mr-2 h-4 w-4" />
                      Log Time
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Log Time</DialogTitle>
                      <DialogDescription>
                        Record time spent on this task
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="time-hours">Hours</Label>
                          <Input
                            id="time-hours"
                            type="number"
                            placeholder="0"
                            min="0"
                            max="24"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time-date">Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Today
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-description">Description</Label>
                        <Textarea
                          id="time-description"
                          placeholder="What did you work on?"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowTimeDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleLogTime}>
                          Log Time
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress
                  value={(taskData.actualHours / taskData.estimatedHours) * 100}
                  className="h-2"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taskData.timeTracking.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{format(entry.date, "MMM dd, yyyy")}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell>{entry.hours}h</TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {entry.description}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Complete history of all task activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {taskData.activity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(activity.timestamp, "MMM dd, yyyy 'at' HH:mm")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}