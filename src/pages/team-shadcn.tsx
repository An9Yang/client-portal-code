/**
 * Team Page - Team member management and collaboration
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
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Activity,
  Star,
  MessageSquare,
  Settings,
  Eye,
  Edit,
  Shield,
  Award
} from "lucide-react";

export default function TeamShadcn() {
  const teamStats = [
    {
      title: "Total Members",
      value: "24",
      change: "+3 this month",
      icon: Users,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Active Today",
      value: "18",
      change: "75% online",
      icon: Activity,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Avg Performance",
      value: "92%",
      change: "+5% this week",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Projects Active",
      value: "12",
      change: "8 teams assigned",
      icon: Target,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Project Manager",
      department: "Management",
      email: "sarah.wilson@company.com",
      phone: "+1 (555) 123-4567",
      avatar: "SW",
      status: "online",
      performance: 96,
      projects: 5,
      tasksCompleted: 142,
      joinDate: "Jan 2023",
      skills: ["Leadership", "Agile", "Strategy"],
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Developer",
      department: "Engineering",
      email: "michael.chen@company.com",
      phone: "+1 (555) 234-5678",
      avatar: "MC",
      status: "online",
      performance: 94,
      projects: 4,
      tasksCompleted: 198,
      joinDate: "Mar 2022",
      skills: ["React", "Node.js", "TypeScript"],
      location: "San Francisco, CA"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "UI/UX Designer",
      department: "Design",
      email: "emma.rodriguez@company.com",
      phone: "+1 (555) 345-6789",
      avatar: "ER",
      status: "busy",
      performance: 98,
      projects: 6,
      tasksCompleted: 156,
      joinDate: "Aug 2023",
      skills: ["Figma", "Design Systems", "Prototyping"],
      location: "Austin, TX"
    },
    {
      id: 4,
      name: "Alex Johnson",
      role: "Backend Developer",
      department: "Engineering",
      email: "alex.johnson@company.com",
      phone: "+1 (555) 456-7890",
      avatar: "AJ",
      status: "away",
      performance: 89,
      projects: 3,
      tasksCompleted: 134,
      joinDate: "Nov 2023",
      skills: ["Python", "PostgreSQL", "AWS"],
      location: "Seattle, WA"
    },
    {
      id: 5,
      name: "Lisa Chang",
      role: "Frontend Developer",
      department: "Engineering",
      email: "lisa.chang@company.com",
      phone: "+1 (555) 567-8901",
      avatar: "LC",
      status: "online",
      performance: 91,
      projects: 4,
      tasksCompleted: 167,
      joinDate: "Jun 2022",
      skills: ["Vue.js", "CSS", "JavaScript"],
      location: "Los Angeles, CA"
    },
    {
      id: 6,
      name: "David Kim",
      role: "Product Designer",
      department: "Design",
      email: "david.kim@company.com",
      phone: "+1 (555) 678-9012",
      avatar: "DK",
      status: "offline",
      performance: 93,
      projects: 2,
      tasksCompleted: 89,
      joinDate: "Feb 2024",
      skills: ["Product Design", "User Research", "Sketch"],
      location: "Chicago, IL"
    }
  ];

  const departments = [
    { name: "Engineering", count: 12, performance: 92 },
    { name: "Design", count: 6, performance: 95 },
    { name: "Management", count: 4, performance: 96 },
    { name: "Marketing", count: 2, performance: 88 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "busy":
        return "bg-amber-500";
      case "away":
        return "bg-slate-400";
      case "offline":
        return "bg-slate-300";
      default:
        return "bg-slate-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "text-emerald-600";
      case "busy":
        return "text-amber-600";
      case "away":
        return "text-slate-600";
      case "offline":
        return "text-slate-500";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Team Management
          </h1>
          <p className="text-slate-600 mt-1">Manage your team members and track their performance</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search team members..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {teamStats.map((stat, index) => (
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

      {/* Team Management Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-600" />
              Team Overview
            </CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="members">All Members ({teamMembers.length})</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="members" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                              {member.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-slate-600">{member.role}</p>
                            <p className={`text-xs ${getStatusText(member.status)} capitalize`}>{member.status}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {member.joinDate}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Performance</span>
                          <span className="font-medium">{member.performance}%</span>
                        </div>
                        <Progress value={member.performance} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                        <div>
                          <div className="text-lg font-bold">{member.projects}</div>
                          <div className="text-xs text-slate-500">Active Projects</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{member.tasksCompleted}</div>
                          <div className="text-xs text-slate-500">Tasks Done</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="departments" className="space-y-4 mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {departments.map((dept, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{dept.name}</h3>
                          <p className="text-slate-600">{dept.count} members</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{dept.performance}%</div>
                          <div className="text-xs text-slate-500">Avg Performance</div>
                        </div>
                      </div>
                      <Progress value={dept.performance} className="h-3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4 mt-6">
              <div className="space-y-4">
                {teamMembers
                  .sort((a, b) => b.performance - a.performance)
                  .map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {index < 3 && <Award className="w-5 h-5 text-amber-500" />}
                          <span className="font-bold text-lg text-slate-400">#{index + 1}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {member.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-slate-600">{member.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold">{member.performance}%</div>
                          <div className="text-xs text-slate-500">Performance</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{member.tasksCompleted}</div>
                          <div className="text-xs text-slate-500">Tasks</div>
                        </div>
                        <Progress value={member.performance} className="w-24 h-2" />
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