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
  List, Video, Award, BookOpen, Coffee, Globe, Heart, Home,
  Laptop, Lightbulb, Mic, Palette, PenTool, Rocket, Server,
  Smartphone, Tag, Terminal, User, UserCheck, UserPlus, UserMinus
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Area, AreaChart
} from "recharts";

interface TeamMemberData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  avatar?: string;
  status: "active" | "away" | "busy" | "offline";
  joinedDate: Date;
  lastActive: Date;
  bio: string;
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  projects: Array<{
    id: number;
    name: string;
    role: string;
    allocation: number;
    status: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    project: string;
    status: "todo" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: Date;
  }>;
  performance: {
    tasksCompleted: number;
    tasksInProgress: number;
    tasksOverdue: number;
    projectsActive: number;
    utilization: number;
    rating: number;
    badges: string[];
  };
  availability: {
    weeklyHours: number;
    allocatedHours: number;
    availableHours: number;
    schedule: Array<{
      day: string;
      start: string;
      end: string;
      available: boolean;
    }>;
    timeOff: Array<{
      start: Date;
      end: Date;
      reason: string;
      approved: boolean;
    }>;
  };
  contacts: {
    email: string;
    workPhone?: string;
    mobilePhone?: string;
    slack?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: Date;
    icon: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: Date;
    expiry?: Date;
    credential?: string;
  }>;
  activities: Array<{
    id: string;
    action: string;
    target?: string;
    timestamp: Date;
    type: string;
  }>;
}

const teamMembersData: { [key: string]: TeamMemberData } = {
  "1": {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    role: "Project Manager",
    department: "Management",
    location: "San Francisco, CA",
    avatar: "/avatars/sarah.jpg",
    status: "active",
    joinedDate: new Date(2021, 5, 15),
    lastActive: new Date(),
    bio: "Experienced project manager with 8+ years in software development and team leadership. Passionate about agile methodologies and building high-performing teams.",
    skills: [
      { name: "Project Management", level: 95, category: "Management" },
      { name: "Agile/Scrum", level: 90, category: "Management" },
      { name: "Team Leadership", level: 92, category: "Management" },
      { name: "Risk Management", level: 85, category: "Management" },
      { name: "Stakeholder Communication", level: 88, category: "Soft Skills" },
      { name: "Budget Planning", level: 82, category: "Management" },
      { name: "JIRA", level: 85, category: "Tools" },
      { name: "Confluence", level: 80, category: "Tools" }
    ],
    projects: [
      { id: 1, name: "E-Commerce Platform", role: "Project Manager", allocation: 60, status: "in-progress" },
      { id: 2, name: "Mobile Banking App", role: "Advisor", allocation: 20, status: "in-progress" },
      { id: 3, name: "Healthcare Dashboard", role: "Project Manager", allocation: 20, status: "planning" }
    ],
    tasks: [
      { id: "t1", title: "Review sprint planning", project: "E-Commerce Platform", status: "in-progress", priority: "high", dueDate: new Date(2024, 0, 20) },
      { id: "t2", title: "Client presentation preparation", project: "E-Commerce Platform", status: "todo", priority: "urgent", dueDate: new Date(2024, 0, 16) },
      { id: "t3", title: "Budget review Q1", project: "Mobile Banking App", status: "todo", priority: "medium", dueDate: new Date(2024, 0, 25) },
      { id: "t4", title: "Team performance reviews", project: "General", status: "in-progress", priority: "medium", dueDate: new Date(2024, 0, 30) }
    ],
    performance: {
      tasksCompleted: 145,
      tasksInProgress: 4,
      tasksOverdue: 1,
      projectsActive: 3,
      utilization: 85,
      rating: 4.8,
      badges: ["Top Performer", "Team Player", "Innovation Leader"]
    },
    availability: {
      weeklyHours: 40,
      allocatedHours: 34,
      availableHours: 6,
      schedule: [
        { day: "Monday", start: "09:00", end: "18:00", available: true },
        { day: "Tuesday", start: "09:00", end: "18:00", available: true },
        { day: "Wednesday", start: "09:00", end: "18:00", available: true },
        { day: "Thursday", start: "09:00", end: "18:00", available: true },
        { day: "Friday", start: "09:00", end: "17:00", available: true },
        { day: "Saturday", start: "", end: "", available: false },
        { day: "Sunday", start: "", end: "", available: false }
      ],
      timeOff: [
        { start: new Date(2024, 1, 14), end: new Date(2024, 1, 16), reason: "Personal", approved: true }
      ]
    },
    contacts: {
      email: "sarah.chen@company.com",
      workPhone: "+1 (555) 123-4567",
      mobilePhone: "+1 (555) 987-6543",
      slack: "@sarahchen",
      github: "sarahchen",
      linkedin: "sarah-chen-pm",
      twitter: "@sarahchen_pm"
    },
    achievements: [
      { id: "a1", title: "Project of the Year", description: "Led the award-winning Digital Transformation project", date: new Date(2023, 11, 15), icon: "trophy" },
      { id: "a2", title: "Certified Scrum Master", description: "Completed CSM certification", date: new Date(2023, 8, 20), icon: "award" },
      { id: "a3", title: "100+ Projects Delivered", description: "Successfully delivered over 100 projects", date: new Date(2023, 6, 1), icon: "target" }
    ],
    certifications: [
      { id: "c1", name: "PMP - Project Management Professional", issuer: "PMI", date: new Date(2022, 3, 15), expiry: new Date(2025, 3, 15), credential: "PMP123456" },
      { id: "c2", name: "Certified Scrum Master", issuer: "Scrum Alliance", date: new Date(2023, 8, 20), expiry: new Date(2025, 8, 20), credential: "CSM789012" },
      { id: "c3", name: "AWS Solutions Architect", issuer: "Amazon", date: new Date(2023, 1, 10), expiry: new Date(2026, 1, 10), credential: "AWS345678" }
    ],
    activities: [
      { id: "act1", action: "completed task", target: "Sprint planning review", timestamp: new Date(2024, 0, 15, 14, 30), type: "task" },
      { id: "act2", action: "joined meeting", target: "Client sync", timestamp: new Date(2024, 0, 15, 11, 0), type: "meeting" },
      { id: "act3", action: "updated project", target: "E-Commerce Platform", timestamp: new Date(2024, 0, 14, 16, 45), type: "project" },
      { id: "act4", action: "approved request", target: "Budget increase", timestamp: new Date(2024, 0, 14, 10, 20), type: "approval" }
    ]
  },
  "2": {
    id: "2",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 234-5678",
    role: "Senior Full Stack Developer",
    department: "Engineering",
    location: "New York, NY",
    avatar: "/avatars/mike.jpg",
    status: "active",
    joinedDate: new Date(2020, 8, 1),
    lastActive: new Date(),
    bio: "Full stack developer with expertise in React, Node.js, and cloud architectures. Love building scalable applications and mentoring junior developers.",
    skills: [
      { name: "React", level: 95, category: "Frontend" },
      { name: "Node.js", level: 90, category: "Backend" },
      { name: "TypeScript", level: 92, category: "Languages" },
      { name: "PostgreSQL", level: 85, category: "Database" },
      { name: "AWS", level: 80, category: "Cloud" },
      { name: "Docker", level: 85, category: "DevOps" },
      { name: "GraphQL", level: 75, category: "API" },
      { name: "Redis", level: 70, category: "Database" }
    ],
    projects: [
      { id: 1, name: "E-Commerce Platform", role: "Lead Developer", allocation: 80, status: "in-progress" },
      { id: 4, name: "API Gateway", role: "Technical Lead", allocation: 20, status: "in-progress" }
    ],
    tasks: [
      { id: "t5", title: "Implement payment gateway", project: "E-Commerce Platform", status: "in-progress", priority: "high", dueDate: new Date(2024, 0, 20) },
      { id: "t6", title: "Code review - Auth module", project: "E-Commerce Platform", status: "review", priority: "high", dueDate: new Date(2024, 0, 18) },
      { id: "t7", title: "Setup CI/CD pipeline", project: "API Gateway", status: "done", priority: "medium", dueDate: new Date(2024, 0, 10) }
    ],
    performance: {
      tasksCompleted: 238,
      tasksInProgress: 3,
      tasksOverdue: 0,
      projectsActive: 2,
      utilization: 90,
      rating: 4.9,
      badges: ["Code Quality Champion", "Mentor", "Innovation Award"]
    },
    availability: {
      weeklyHours: 40,
      allocatedHours: 36,
      availableHours: 4,
      schedule: [
        { day: "Monday", start: "08:00", end: "17:00", available: true },
        { day: "Tuesday", start: "08:00", end: "17:00", available: true },
        { day: "Wednesday", start: "08:00", end: "17:00", available: true },
        { day: "Thursday", start: "08:00", end: "17:00", available: true },
        { day: "Friday", start: "08:00", end: "16:00", available: true },
        { day: "Saturday", start: "", end: "", available: false },
        { day: "Sunday", start: "", end: "", available: false }
      ],
      timeOff: []
    },
    contacts: {
      email: "mike.johnson@company.com",
      workPhone: "+1 (555) 234-5678",
      slack: "@mikej",
      github: "mikejohnson",
      linkedin: "mike-johnson-dev"
    },
    achievements: [
      { id: "a4", title: "Code Quality Champion", description: "Maintained 100% code coverage for 6 months", date: new Date(2023, 10, 1), icon: "star" },
      { id: "a5", title: "Mentor of the Year", description: "Mentored 5 junior developers", date: new Date(2023, 11, 20), icon: "users" }
    ],
    certifications: [
      { id: "c4", name: "AWS Certified Developer", issuer: "Amazon", date: new Date(2022, 6, 15), expiry: new Date(2025, 6, 15), credential: "AWSDEV123" },
      { id: "c5", name: "Google Cloud Professional", issuer: "Google", date: new Date(2023, 2, 10), credential: "GCP456789" }
    ],
    activities: [
      { id: "act5", action: "pushed code", target: "payment-gateway branch", timestamp: new Date(2024, 0, 15, 15, 45), type: "code" },
      { id: "act6", action: "reviewed PR", target: "#1234", timestamp: new Date(2024, 0, 15, 13, 20), type: "review" }
    ]
  }
};

const performanceData = [
  { month: "Aug", tasks: 28, projects: 3, utilization: 82 },
  { month: "Sep", tasks: 32, projects: 3, utilization: 85 },
  { month: "Oct", tasks: 30, projects: 4, utilization: 88 },
  { month: "Nov", tasks: 35, projects: 4, utilization: 90 },
  { month: "Dec", tasks: 33, projects: 3, utilization: 85 },
  { month: "Jan", tasks: 29, projects: 3, utilization: 85 }
];

const skillsRadarData = [
  { skill: "Technical", A: 85, fullMark: 100 },
  { skill: "Communication", A: 90, fullMark: 100 },
  { skill: "Leadership", A: 92, fullMark: 100 },
  { skill: "Problem Solving", A: 88, fullMark: 100 },
  { skill: "Time Management", A: 85, fullMark: 100 },
  { skill: "Collaboration", A: 95, fullMark: 100 }
];

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = teamMembersData[id || "1"] || teamMembersData["1"];

  const [activeTab, setActiveTab] = useState("overview");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      "active": "bg-green-500",
      "away": "bg-yellow-500",
      "busy": "bg-red-500",
      "offline": "bg-gray-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-400";
  };

  const getSkillColor = (level: number) => {
    if (level >= 90) return "text-green-600";
    if (level >= 70) return "text-blue-600";
    if (level >= 50) return "text-yellow-600";
    return "text-gray-600";
  };

  const getAchievementIcon = (icon: string) => {
    const icons = {
      trophy: Award,
      award: Award,
      target: Target,
      star: Star,
      users: Users,
      rocket: Rocket
    };
    return icons[icon as keyof typeof icons] || Award;
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
                <BreadcrumbLink href="/team">Team</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{member.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/team")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-16 w-16">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>
                {member.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{member.name}</h1>
                <div className={cn("h-3 w-3 rounded-full", getStatusColor(member.status))} />
              </div>
              <p className="text-muted-foreground">{member.role} • {member.department}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setShowMessageDialog(true)}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" onClick={() => setShowScheduleDialog(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
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
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Video className="mr-2 h-4 w-4" />
                Start Video Call
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Archive className="mr-2 h-4 w-4" />
                Archive Member
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
                <p className="text-sm text-muted-foreground">Utilization</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{member.performance.utilization}%</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={member.performance.utilization} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{member.performance.projectsActive}</span>
                </div>
              </div>
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{member.performance.tasksCompleted}</span>
                  <span className="text-sm text-green-500">+12%</span>
                </div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Performance Rating</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{member.performance.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(member.performance.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{member.contacts.email}</span>
                        </div>
                        {member.contacts.workPhone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{member.contacts.workPhone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{member.location}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Work Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{member.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Joined {format(member.joinedDate, "MMM yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Last active {format(member.lastActive, "h:mm a")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {member.projects.map(project => (
                      <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="capitalize">
                            {project.status}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm font-medium">{project.allocation}%</p>
                            <p className="text-xs text-muted-foreground">Allocated</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Badges & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.performance.badges.map(badge => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    {member.achievements.slice(0, 3).map(achievement => {
                      const Icon = getAchievementIcon(achievement.icon);
                      return (
                        <div key={achievement.id} className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(achievement.date, "MMM yyyy")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {member.contacts.github && (
                      <Button variant="outline" className="w-full justify-start">
                        <Github className="h-4 w-4 mr-2" />
                        {member.contacts.github}
                      </Button>
                    )}
                    {member.contacts.linkedin && (
                      <Button variant="outline" className="w-full justify-start">
                        <Linkedin className="h-4 w-4 mr-2" />
                        {member.contacts.linkedin}
                      </Button>
                    )}
                    {member.contacts.twitter && (
                      <Button variant="outline" className="w-full justify-start">
                        <Twitter className="h-4 w-4 mr-2" />
                        {member.contacts.twitter}
                      </Button>
                    )}
                    {member.contacts.slack && (
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {member.contacts.slack}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {member.projects.map(project => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <p className="text-muted-foreground">{project.role}</p>
                    </div>
                    <Badge variant={project.status === "in-progress" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Allocation</span>
                      <span className="font-medium">{project.allocation}%</span>
                    </div>
                    <Progress value={project.allocation} />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      View Project
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Tasks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <UITable>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {member.tasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{task.project}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {task.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        task.priority === "urgent" ? "destructive" :
                        task.priority === "high" ? "default" :
                        "secondary"
                      }>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(task.dueDate, "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </UITable>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {member.skills.filter(s => s.category !== "Soft Skills").map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className={cn("text-sm font-medium", getSkillColor(skill.level))}>
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={skillsRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Skills"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {member.certifications.map(cert => (
                  <div key={cert.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Issued: {format(cert.date, "MMM yyyy")}</span>
                          {cert.expiry && (
                            <span>Expires: {format(cert.expiry, "MMM yyyy")}</span>
                          )}
                        </div>
                      </div>
                      <Award className="h-5 w-5 text-muted-foreground" />
                    </div>
                    {cert.credential && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          {cert.credential}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tasks" stroke="#8884d8" name="Tasks Completed" />
                    <Line type="monotone" dataKey="utilization" stroke="#82ca9d" name="Utilization %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tasks Completed</span>
                    <span className="text-2xl font-bold">{member.performance.tasksCompleted}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">In Progress</span>
                    <span className="text-2xl font-bold">{member.performance.tasksInProgress}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overdue</span>
                    <span className="text-2xl font-bold text-red-500">{member.performance.tasksOverdue}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Performance Rating</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{member.performance.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(member.performance.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <UITable>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Working Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.availability.schedule.map(day => (
                    <TableRow key={day.day}>
                      <TableCell className="font-medium">{day.day}</TableCell>
                      <TableCell>
                        {day.available ? `${day.start} - ${day.end}` : "Off"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={day.available ? "default" : "secondary"}>
                          {day.available ? "Available" : "Off"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </UITable>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly Hours</p>
                    <p className="text-2xl font-bold">{member.availability.weeklyHours}h</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Allocated</p>
                    <p className="text-2xl font-bold">{member.availability.allocatedHours}h</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold text-green-600">{member.availability.availableHours}h</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {member.availability.timeOff.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Time Off</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {member.availability.timeOff.map((time, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {format(time.start, "MMM d")} - {format(time.end, "MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">{time.reason}</p>
                      </div>
                      <Badge variant={time.approved ? "default" : "secondary"}>
                        {time.approved ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {member.activities.map(activity => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      {activity.type === "task" && <CheckCircle2 className="h-4 w-4" />}
                      {activity.type === "meeting" && <Users className="h-4 w-4" />}
                      {activity.type === "project" && <Briefcase className="h-4 w-4" />}
                      {activity.type === "approval" && <Check className="h-4 w-4" />}
                      {activity.type === "code" && <Code className="h-4 w-4" />}
                      {activity.type === "review" && <Eye className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{member.name}</span>
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
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update team member information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={member.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={member.email} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue={member.role} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue={member.department}>
                  <SelectTrigger id="department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue={member.bio} rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={member.phone} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue={member.location} />
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
                title: "Profile Updated",
                description: "Team member profile has been successfully updated.",
              });
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a direct message to {member.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter message subject" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={6} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="urgent" />
              <Label htmlFor="urgent">Mark as urgent</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowMessageDialog(false);
              toast({
                title: "Message Sent",
                description: `Your message has been sent to ${member.name}.`,
              });
              navigate("/messages");
            }}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Meeting</DialogTitle>
            <DialogDescription>
              Schedule a meeting with {member.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="meeting-title">Meeting Title</Label>
              <Input id="meeting-title" placeholder="Enter meeting title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="meeting-date">Date</Label>
                <Input id="meeting-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meeting-time">Time</Label>
                <Input id="meeting-time" type="time" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Select>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="meeting-notes">Notes</Label>
              <Textarea id="meeting-notes" placeholder="Add meeting agenda or notes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowScheduleDialog(false);
              toast({
                title: "Meeting Scheduled",
                description: `Meeting with ${member.name} has been scheduled.`,
              });
              navigate("/calendar");
            }}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}