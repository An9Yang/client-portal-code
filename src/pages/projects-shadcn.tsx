/**
 * Projects Page - Comprehensive projects listing with filtering and management
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
  MoreVertical,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  ArrowUpRight,
  Briefcase,
  Target,
  TrendingUp,
  Eye,
  Settings
} from "lucide-react";

export default function ProjectsShadcn() {
  const projectStats = [
    {
      title: "Total Projects",
      value: "24",
      change: "+3 this month",
      icon: Briefcase,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Active Projects",
      value: "12",
      change: "67% of total",
      icon: Play,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Completed",
      value: "8",
      change: "+2 this week",
      icon: CheckCircle,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "At Risk",
      value: "2",
      change: "-1 resolved",
      icon: AlertCircle,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const allProjects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "TechCorp Inc.",
      status: "in-progress",
      priority: "high",
      progress: 75,
      budget: "$45,000",
      spent: "$33,750",
      startDate: "Oct 15, 2024",
      deadline: "Dec 15, 2024",
      team: ["Sarah Wilson", "Michael Chen", "Emma Rodriguez"],
      description: "Complete website overhaul with modern design and improved UX"
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "StartupXYZ",
      status: "in-progress",
      priority: "high",
      progress: 40,
      budget: "$75,000",
      spent: "$30,000",
      startDate: "Nov 1, 2024",
      deadline: "Jan 20, 2025",
      team: ["Alex Johnson", "Lisa Chang", "David Kim", "Rachel Green"],
      description: "iOS and Android app for e-commerce platform"
    },
    {
      id: 3,
      name: "Marketing Campaign",
      client: "RetailPlus",
      status: "completed",
      priority: "medium",
      progress: 100,
      budget: "$25,000",
      spent: "$24,200",
      startDate: "Sep 1, 2024",
      deadline: "Nov 30, 2024",
      team: ["Emma Rodriguez", "Tom Wilson"],
      description: "Digital marketing campaign for holiday season"
    },
    {
      id: 4,
      name: "Data Migration",
      client: "FinanceHub",
      status: "planning",
      priority: "medium",
      progress: 15,
      budget: "$60,000",
      spent: "$9,000",
      startDate: "Dec 1, 2024",
      deadline: "Feb 10, 2025",
      team: ["Michael Chen", "Sarah Wilson", "Alex Johnson"],
      description: "Migrate legacy data systems to cloud infrastructure"
    },
    {
      id: 5,
      name: "Brand Identity Redesign",
      client: "CreativeAgency",
      status: "on-hold",
      priority: "low",
      progress: 25,
      budget: "$30,000",
      spent: "$7,500",
      startDate: "Oct 1, 2024",
      deadline: "Jan 15, 2025",
      team: ["Lisa Chang", "David Kim"],
      description: "Complete brand overhaul including logo, colors, and guidelines"
    },
    {
      id: 6,
      name: "E-commerce Platform",
      client: "OnlineRetailer",
      status: "in-progress",
      priority: "high",
      progress: 60,
      budget: "$90,000",
      spent: "$54,000",
      startDate: "Sep 15, 2024",
      deadline: "Dec 30, 2024",
      team: ["Tom Wilson", "Rachel Green", "Lisa Chang"],
      description: "Custom e-commerce solution with advanced analytics"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "planning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "on-hold":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "";
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

  const activeProjects = allProjects.filter(p => p.status === "in-progress");
  const completedProjects = allProjects.filter(p => p.status === "completed");
  const plannedProjects = allProjects.filter(p => p.status === "planning");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-slate-600 mt-1">Manage and track all your projects in one place</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projectStats.map((stat, index) => (
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

      {/* Projects Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-600" />
              Project Management
            </CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Projects ({allProjects.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
              <TabsTrigger value="planning">Planning ({plannedProjects.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-6">
              <div className="space-y-4">
                {allProjects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-lg p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-1 h-12 rounded-full ${getPriorityColor(project.priority)}`} />
                        <div>
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <p className="text-slate-600">{project.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {project.priority} priority
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4">{project.description}</p>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">Due: {project.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">Budget: {project.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{project.team.length} team members</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">Progress: {project.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Project Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                          >
                            {member.charAt(0)}
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold border-2 border-white">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4 mt-6">
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-lg p-6 border-l-4 border-l-blue-500">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-slate-600">{project.client}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">Progress: {project.progress}%</div>
                      <Progress value={project.progress} className="w-32 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 mt-6">
              <div className="space-y-4">
                {completedProjects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-lg p-6 border-l-4 border-l-emerald-500">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-slate-600">{project.client}</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">Budget: {project.budget} | Spent: {project.spent}</div>
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="planning" className="space-y-4 mt-6">
              <div className="space-y-4">
                {plannedProjects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-lg p-6 border-l-4 border-l-amber-500">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-slate-600">{project.client}</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700">Planning</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">Start Date: {project.startDate}</div>
                      <Button variant="outline" size="sm">Start Project</Button>
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