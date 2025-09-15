/**
 * Projects Page - Comprehensive project management center
 * Core business hub connecting tasks, team, and timeline
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Plus, Search, Filter, Grid3x3, List, MoreVertical,
  Calendar, Users, DollarSign, Clock, Activity,
  TrendingUp, AlertCircle, CheckCircle2, XCircle,
  FileText, Link2, MessageSquare, Settings,
  ArrowUp, ArrowDown, ArrowRight, BarChart3,
  Edit, Trash2, Archive, Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingProject, setDeletingProject] = useState<any>(null);

  // Project data aligned with Dashboard and Analytics
  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      client: "TechCorp",
      status: "in-progress",
      priority: "high",
      progress: 75,
      budget: 150000,
      spent: 112500,
      startDate: "2024-01-15",
      deadline: "2024-12-15",
      team: ["SW", "MC", "ER", "AJ"],
      tasks: { total: 48, completed: 36 },
      description: "Full-scale e-commerce solution with payment integration",
      revenue: 45000,
      health: "on-track"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "FinanceHub",
      status: "in-progress",
      priority: "high",
      progress: 40,
      budget: 200000,
      spent: 80000,
      startDate: "2024-03-01",
      deadline: "2025-01-20",
      team: ["MC", "DL", "ER"],
      tasks: { total: 62, completed: 25 },
      description: "Secure mobile banking application with biometric auth",
      revenue: 32000,
      health: "at-risk"
    },
    {
      id: 3,
      name: "Marketing Dashboard",
      client: "RetailPlus",
      status: "completed",
      priority: "medium",
      progress: 100,
      budget: 80000,
      spent: 78000,
      startDate: "2024-01-01",
      deadline: "2024-11-30",
      team: ["SW", "AJ"],
      tasks: { total: 32, completed: 32 },
      description: "Analytics dashboard for marketing campaign tracking",
      revenue: 38000,
      health: "completed"
    },
    {
      id: 4,
      name: "Healthcare Portal",
      client: "HealthNet",
      status: "planning",
      priority: "medium",
      progress: 15,
      budget: 120000,
      spent: 18000,
      startDate: "2024-11-01",
      deadline: "2025-02-10",
      team: ["ER", "DL"],
      tasks: { total: 40, completed: 6 },
      description: "Patient management system with appointment booking",
      revenue: 28000,
      health: "on-track"
    },
    {
      id: 5,
      name: "Learning Platform",
      client: "EduSmart",
      status: "in-progress",
      priority: "low",
      progress: 60,
      budget: 90000,
      spent: 54000,
      startDate: "2024-02-15",
      deadline: "2024-12-30",
      team: ["MC", "SW", "AJ"],
      tasks: { total: 45, completed: 27 },
      description: "Online learning platform with video streaming",
      revenue: 22000,
      health: "on-track"
    },
    {
      id: 6,
      name: "API Gateway",
      client: "StartupXYZ",
      status: "on-hold",
      priority: "low",
      progress: 25,
      budget: 50000,
      spent: 12500,
      startDate: "2024-06-01",
      deadline: "2025-01-15",
      team: ["DL"],
      tasks: { total: 20, completed: 5 },
      description: "Microservices API gateway with rate limiting",
      revenue: 15000,
      health: "delayed"
    }
  ];

  // Filter projects based on status and search
  const filteredProjects = projects.filter(project => {
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === "in-progress").length,
    completed: projects.filter(p => p.status === "completed").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    totalRevenue: projects.reduce((sum, p) => sum + p.revenue, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'on-track': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'at-risk': return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'delayed': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all client projects in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">{stats.active} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.completed / stats.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">{stats.completed} completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalBudget / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              ${(stats.totalSpent / 1000).toFixed(0)}K spent
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((stats.totalSpent / stats.totalBudget) * 100)}%
            </div>
            <Progress value={(stats.totalSpent / stats.totalBudget) * 100} className="mt-2 h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-600 mr-1" />
              12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
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

      {/* Projects Display */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/projects/${project.id}`)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/projects/${project.id}`);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProject(project);
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/reports`);
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Reports
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success(`${project.name} archived`);
                        }}
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingProject(project);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline">
                    {project.priority} priority
                  </Badge>
                  {getHealthIcon(project.health)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">${(project.budget / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Spent</p>
                    <p className="font-medium">${(project.spent / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Tasks</p>
                    <p className="font-medium">
                      {project.tasks.completed}/{project.tasks.total}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Deadline</p>
                    <p className="font-medium">
                      {new Date(project.deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">{member}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs">
                          +{project.team.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                      Project
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                      Progress
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                      Budget
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                      Team
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                      Deadline
                    </th>
                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                        onClick={() => navigate(`/projects/${project.id}`)}>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.client}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          {getHealthIcon(project.health)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2 w-24" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <p>${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((project.spent / project.budget) * 100)}% used
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="h-8 w-8 border-2 border-background">
                              <AvatarFallback className="text-xs">{member}</AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <span className="ml-2 text-sm text-muted-foreground">
                              +{project.team.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {new Date(project.deadline).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/projects/${project.id}`);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingProject(project);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/reports`);
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Reports
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.success(`${project.name} archived`);
                              }}
                            >
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingProject(project);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Project
                            </DropdownMenuItem>
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

      {/* Edit Project Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update project information and settings
            </DialogDescription>
          </DialogHeader>
          {editingProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Project Name</Label>
                  <Input id="edit-name" defaultValue={editingProject.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-client">Client</Label>
                  <Input id="edit-client" defaultValue={editingProject.client} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={editingProject.status}>
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select defaultValue={editingProject.priority}>
                    <SelectTrigger>
                      <SelectValue />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-budget">Budget ($)</Label>
                  <Input
                    id="edit-budget"
                    type="number"
                    defaultValue={editingProject.budget}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-deadline">Deadline</Label>
                  <Input
                    id="edit-deadline"
                    type="date"
                    defaultValue={editingProject.deadline}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Project description..."
                  className="min-h-[100px]"
                  defaultValue={`${editingProject.name} for ${editingProject.client}`}
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success(`${editingProject.name} has been updated`);
                  setShowEditDialog(false);
                }}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Project Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deletingProject && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium">{deletingProject.name}</p>
                <p className="text-sm text-muted-foreground">{deletingProject.client}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>This will also delete all associated tasks and data</span>
                </div>
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Team members will lose access to this project</span>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    toast.success(`${deletingProject.name} has been deleted`);
                    setShowDeleteDialog(false);
                  }}
                >
                  Delete Project
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}