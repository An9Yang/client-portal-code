import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft, Edit, Trash2, Download, Upload, Share2, Copy, ExternalLink,
  Calendar, Clock, Users, DollarSign, TrendingUp, AlertCircle, CheckCircle2,
  FileText, Image, Paperclip, MessageSquare, Activity, Target, BarChart3,
  Plus, Filter, Search, MoreVertical, Star, Bookmark, Archive, Send,
  ChevronRight, ChevronDown, ChevronUp, Eye, EyeOff, Lock, Unlock,
  Settings, RefreshCw, Save, X, Check, Info, HelpCircle, Flag,
  Briefcase, MapPin, Phone, Mail, Github, Linkedin, Twitter,
  Code, Database, Cloud, Shield, Zap, Package, Layers, Grid,
  List, Kanban, Gantt, Table, Folder, File, Video, Mic
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface ProjectData {
  id: number;
  name: string;
  client: string;
  description: string;
  status: "planning" | "in-progress" | "review" | "completed" | "on-hold";
  priority: "low" | "medium" | "high" | "critical";
  progress: number;
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  manager: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  team: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
    allocation: number;
  }>;
  milestones: Array<{
    id: string;
    name: string;
    description: string;
    date: Date;
    status: "pending" | "in-progress" | "completed";
    deliverables: string[];
  }>;
  tasks: Array<{
    id: string;
    title: string;
    assignee: string;
    status: "todo" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: Date;
  }>;
  files: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedBy: string;
    uploadedAt: Date;
    category: "document" | "design" | "code" | "media" | "other";
  }>;
  activities: Array<{
    id: string;
    user: string;
    action: string;
    target?: string;
    timestamp: Date;
    type: "create" | "update" | "delete" | "comment" | "upload" | "status";
  }>;
  risks: Array<{
    id: string;
    title: string;
    description: string;
    impact: "low" | "medium" | "high" | "critical";
    probability: "low" | "medium" | "high";
    mitigation: string;
    owner: string;
    status: "identified" | "mitigating" | "resolved";
  }>;
  technologies: string[];
  repository?: string;
  liveUrl?: string;
  tags: string[];
}

const projectsData: { [key: string]: ProjectData } = {
  "1": {
    id: 1,
    name: "E-Commerce Platform",
    client: "TechCorp",
    description: "A comprehensive e-commerce solution with advanced features including AI-powered recommendations, real-time inventory management, and multi-currency support. The platform is designed to handle high traffic and provide seamless shopping experience across devices.",
    status: "in-progress",
    priority: "high",
    progress: 75,
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2024, 2, 31),
    budget: 150000,
    spent: 112500,
    manager: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "/avatars/sarah.jpg"
    },
    team: [
      { id: "2", name: "Mike Johnson", role: "Lead Developer", avatar: "/avatars/mike.jpg", allocation: 100 },
      { id: "3", name: "Emily Davis", role: "UI/UX Designer", avatar: "/avatars/emily.jpg", allocation: 80 },
      { id: "4", name: "Alex Kim", role: "Backend Developer", allocation: 100 },
      { id: "5", name: "Lisa Wang", role: "QA Engineer", allocation: 60 }
    ],
    milestones: [
      {
        id: "m1",
        name: "Phase 1: Foundation",
        description: "Setup infrastructure and basic features",
        date: new Date(2023, 10, 30),
        status: "completed",
        deliverables: ["Database schema", "Authentication system", "Basic UI"]
      },
      {
        id: "m2",
        name: "Phase 2: Core Features",
        description: "Implement shopping cart and payment integration",
        date: new Date(2024, 0, 15),
        status: "in-progress",
        deliverables: ["Shopping cart", "Payment gateway", "Order management"]
      },
      {
        id: "m3",
        name: "Phase 3: Advanced Features",
        description: "AI recommendations and analytics",
        date: new Date(2024, 2, 15),
        status: "pending",
        deliverables: ["Recommendation engine", "Analytics dashboard", "A/B testing"]
      }
    ],
    tasks: [
      { id: "t1", title: "Implement payment gateway", assignee: "Mike Johnson", status: "in-progress", priority: "high", dueDate: new Date(2024, 0, 20) },
      { id: "t2", title: "Design checkout flow", assignee: "Emily Davis", status: "review", priority: "high", dueDate: new Date(2024, 0, 18) },
      { id: "t3", title: "Setup CI/CD pipeline", assignee: "Alex Kim", status: "done", priority: "medium", dueDate: new Date(2024, 0, 10) },
      { id: "t4", title: "Write API documentation", assignee: "Mike Johnson", status: "todo", priority: "low", dueDate: new Date(2024, 0, 25) },
      { id: "t5", title: "Performance testing", assignee: "Lisa Wang", status: "todo", priority: "medium", dueDate: new Date(2024, 0, 30) }
    ],
    files: [
      { id: "f1", name: "Project_Proposal.pdf", type: "pdf", size: "2.4 MB", uploadedBy: "Sarah Chen", uploadedAt: new Date(2023, 8, 1), category: "document" },
      { id: "f2", name: "UI_Mockups.fig", type: "figma", size: "15.3 MB", uploadedBy: "Emily Davis", uploadedAt: new Date(2023, 8, 15), category: "design" },
      { id: "f3", name: "Technical_Spec.docx", type: "doc", size: "856 KB", uploadedBy: "Mike Johnson", uploadedAt: new Date(2023, 8, 20), category: "document" },
      { id: "f4", name: "Database_Schema.sql", type: "sql", size: "45 KB", uploadedBy: "Alex Kim", uploadedAt: new Date(2023, 9, 5), category: "code" },
      { id: "f5", name: "Logo_Assets.zip", type: "zip", size: "8.2 MB", uploadedBy: "Emily Davis", uploadedAt: new Date(2023, 9, 10), category: "media" }
    ],
    activities: [
      { id: "a1", user: "Mike Johnson", action: "updated task status", target: "Implement payment gateway", timestamp: new Date(2024, 0, 15, 14, 30), type: "update" },
      { id: "a2", user: "Emily Davis", action: "uploaded file", target: "Checkout_Flow_v2.fig", timestamp: new Date(2024, 0, 15, 11, 20), type: "upload" },
      { id: "a3", user: "Sarah Chen", action: "commented on", target: "Phase 2 progress", timestamp: new Date(2024, 0, 14, 16, 45), type: "comment" },
      { id: "a4", user: "Alex Kim", action: "completed task", target: "Setup CI/CD pipeline", timestamp: new Date(2024, 0, 10, 9, 15), type: "status" },
      { id: "a5", user: "Lisa Wang", action: "joined the project", timestamp: new Date(2024, 0, 5, 10, 0), type: "create" }
    ],
    risks: [
      {
        id: "r1",
        title: "Payment Gateway Integration Delay",
        description: "Third-party payment provider API changes may cause delays",
        impact: "high",
        probability: "medium",
        mitigation: "Have backup payment provider ready, maintain close communication with provider",
        owner: "Mike Johnson",
        status: "mitigating"
      },
      {
        id: "r2",
        title: "Performance Issues with High Traffic",
        description: "System may not handle expected Black Friday traffic",
        impact: "critical",
        probability: "low",
        mitigation: "Implement auto-scaling, conduct thorough load testing",
        owner: "Alex Kim",
        status: "identified"
      }
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Stripe", "ElasticSearch"],
    repository: "https://github.com/company/ecommerce-platform",
    liveUrl: "https://staging.techcorp-shop.com",
    tags: ["e-commerce", "react", "node.js", "high-priority"]
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData[id || "1"] || projectsData["1"];

  const [activeTab, setActiveTab] = useState("overview");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      "planning": "bg-gray-500",
      "in-progress": "bg-blue-500",
      "review": "bg-yellow-500",
      "completed": "bg-green-500",
      "on-hold": "bg-orange-500",
      "todo": "bg-gray-500",
      "done": "bg-green-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "low": "text-gray-500",
      "medium": "text-yellow-500",
      "high": "text-orange-500",
      "critical": "text-red-500",
      "urgent": "text-red-500"
    };
    return colors[priority as keyof typeof colors] || "text-gray-500";
  };

  const getRiskColor = (impact: string, probability: string) => {
    const score =
      (impact === "critical" ? 4 : impact === "high" ? 3 : impact === "medium" ? 2 : 1) *
      (probability === "high" ? 3 : probability === "medium" ? 2 : 1);

    if (score >= 9) return "bg-red-500";
    if (score >= 6) return "bg-orange-500";
    if (score >= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/projects")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-muted-foreground">{project.client}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={cn("h-2 w-2 rounded-full", getStatusColor(project.status))} />
                  <span className="font-medium capitalize">{project.status.replace("-", " ")}</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{project.progress}%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Budget Used</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">
                    ${(project.spent / 1000).toFixed(0)}k
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / ${(project.budget / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={(project.spent / project.budget) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Timeline</p>
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-sm">
                    {format(project.startDate, "MMM d")} - {format(project.endDate, "MMM d, yyyy")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.ceil((project.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                  </span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Project Manager</h4>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project.manager.avatar} />
                      <AvatarFallback>
                        {project.manager.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{project.manager.name}</p>
                      <p className="text-xs text-muted-foreground">{project.manager.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Priority</h4>
                  <Badge variant={project.priority === "critical" ? "destructive" : project.priority === "high" ? "default" : "secondary"}>
                    {project.priority}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>
              {(project.repository || project.liveUrl) && (
                <div className="flex gap-4 mt-4">
                  {project.repository && (
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      Repository
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{project.tasks.length}</p>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {project.tasks.filter(t => t.status === "done").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{project.team.length}</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{project.files.length}</p>
                  <p className="text-sm text-muted-foreground">Files</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Input placeholder="Search tasks..." className="w-64" />
            </div>
            <Button onClick={() => setShowAddTaskDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>

          <Card>
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.tasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {task.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={cn("capitalize", getPriorityColor(task.priority))}>
                        {task.priority}
                      </span>
                    </TableCell>
                    <TableCell>{format(task.dueDate, "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Assign</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </UITable>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setShowAddMemberDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {project.team.map(member => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <Badge variant="secondary" className="mt-1">
                          {member.allocation}% allocated
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/team/${member.id}`)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Edit Allocation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Remove from Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {project.milestones.map(milestone => (
            <Card key={milestone.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{milestone.name}</h3>
                      <Badge variant={
                        milestone.status === "completed" ? "default" :
                        milestone.status === "in-progress" ? "secondary" :
                        "outline"
                      }>
                        {milestone.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(milestone.date, "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {milestone.deliverables.length} deliverables
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
                {milestone.deliverables.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Deliverables</h4>
                    <div className="space-y-1">
                      {milestone.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Input placeholder="Search files..." className="w-64" />
            </div>
            <Button onClick={() => setShowUploadDialog(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </div>

          <Card>
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.files.map(file => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {file.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {file.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{file.uploadedBy}</TableCell>
                    <TableCell>{format(file.uploadedAt, "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
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
            </UITable>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          {project.risks.map(risk => (
            <Card key={risk.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", getRiskColor(risk.impact, risk.probability))} />
                      <h3 className="font-semibold">{risk.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {risk.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{risk.description}</p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Impact: </span>
                        <span className={cn("font-medium capitalize", getPriorityColor(risk.impact))}>
                          {risk.impact}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Probability: </span>
                        <span className={cn("font-medium capitalize", getPriorityColor(risk.probability))}>
                          {risk.probability}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Owner: </span>
                        <span className="font-medium">{risk.owner}</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-1">Mitigation Strategy</p>
                      <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.activities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      activity.type === "create" && "bg-green-100",
                      activity.type === "update" && "bg-blue-100",
                      activity.type === "delete" && "bg-red-100",
                      activity.type === "comment" && "bg-yellow-100",
                      activity.type === "upload" && "bg-purple-100",
                      activity.type === "status" && "bg-gray-100"
                    )}>
                      {activity.type === "create" && <Plus className="h-4 w-4 text-green-600" />}
                      {activity.type === "update" && <Edit className="h-4 w-4 text-blue-600" />}
                      {activity.type === "delete" && <Trash2 className="h-4 w-4 text-red-600" />}
                      {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-yellow-600" />}
                      {activity.type === "upload" && <Upload className="h-4 w-4 text-purple-600" />}
                      {activity.type === "status" && <Activity className="h-4 w-4 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {" "}{activity.action}
                        {activity.target && (
                          <>
                            {" "}<span className="font-medium">"{activity.target}"</span>
                          </>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(activity.timestamp, "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update project information and settings
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" defaultValue={project.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={project.description} rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={project.status}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue={project.priority}>
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" type="number" defaultValue={project.budget} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Input id="client" defaultValue={project.client} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowEditDialog(false);
              toast({
                title: "Project Updated",
                description: "Project information has been successfully updated.",
              });
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Deleting this project will also remove all associated tasks, files, and data.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              setShowDeleteDialog(false);
              toast({
                title: "Project Deleted",
                description: "The project has been permanently deleted.",
              });
              navigate("/projects");
            }}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for this project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input id="task-title" placeholder="Enter task title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea id="task-description" placeholder="Enter task description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-assignee">Assignee</Label>
                <Select>
                  <SelectTrigger id="task-assignee">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {project.team.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select>
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-due">Due Date</Label>
              <Input id="task-due" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowAddTaskDialog(false);
              toast({
                title: "Task Created",
                description: "New task has been added to the project.",
              });
            }}>
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Add a new member to the project team
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="member-name">Team Member</Label>
              <Select>
                <SelectTrigger id="member-name">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="jane">Jane Doe</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="member-role">Role</Label>
              <Input id="member-role" placeholder="Enter role in project" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="member-allocation">Allocation (%)</Label>
              <Input id="member-allocation" type="number" placeholder="100" min="0" max="100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowAddMemberDialog(false);
              toast({
                title: "Member Added",
                description: "New team member has been added to the project.",
              });
            }}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Upload a file to the project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Select File</Label>
              <Input id="file" type="file" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file-category">Category</Label>
              <Select>
                <SelectTrigger id="file-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file-description">Description</Label>
              <Textarea id="file-description" placeholder="Enter file description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowUploadDialog(false);
              toast({
                title: "File Uploaded",
                description: "File has been successfully uploaded to the project.",
              });
            }}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}