/**
 * Reports Page - Professional reports dashboard with various report types
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
  FileText, 
  Download, 
  Filter,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  FileBarChart,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  DollarSign,
  Briefcase,
  Target
} from "lucide-react";

export default function ReportsShadcn() {
  const reportTypes = [
    {
      title: "Financial Reports",
      description: "Revenue, expenses, and profit analysis",
      icon: DollarSign,
      count: 12,
      lastUpdated: "2 hours ago",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Project Reports",
      description: "Project progress and completion metrics",
      icon: Briefcase,
      count: 8,
      lastUpdated: "5 hours ago",
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Team Performance",
      description: "Individual and team productivity reports",
      icon: Users,
      count: 6,
      lastUpdated: "1 day ago",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Client Reports",
      description: "Client satisfaction and engagement metrics",
      icon: Target,
      count: 4,
      lastUpdated: "3 hours ago",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const recentReports = [
    {
      name: "Q4 Financial Summary",
      type: "Financial",
      status: "completed",
      generatedBy: "System",
      date: "Dec 1, 2024",
      size: "2.4 MB"
    },
    {
      name: "Project Performance Analysis",
      type: "Project",
      status: "generating",
      generatedBy: "Sarah Wilson",
      date: "Dec 3, 2024",
      size: "1.8 MB"
    },
    {
      name: "Team Productivity Report",
      type: "Team",
      status: "completed",
      generatedBy: "Michael Chen",
      date: "Nov 28, 2024",
      size: "945 KB"
    },
    {
      name: "Client Satisfaction Survey",
      type: "Client",
      status: "pending",
      generatedBy: "Emma Rodriguez",
      date: "Dec 2, 2024",
      size: "1.2 MB"
    },
    {
      name: "Monthly Revenue Report",
      type: "Financial",
      status: "completed",
      generatedBy: "Alex Johnson",
      date: "Nov 30, 2024",
      size: "3.1 MB"
    }
  ];

  const quickStats = [
    { label: "Reports Generated", value: "156", change: "+12", period: "this month" },
    { label: "Average Size", value: "2.1 MB", change: "-0.3", period: "vs last month" },
    { label: "Processing Time", value: "3.2 min", change: "-0.8", period: "avg" },
    { label: "Success Rate", value: "98.5%", change: "+1.2", period: "completion" }
  ];

  const scheduledReports = [
    { name: "Weekly Team Summary", frequency: "Weekly", nextRun: "Dec 9, 2024", enabled: true },
    { name: "Monthly Financial Report", frequency: "Monthly", nextRun: "Jan 1, 2025", enabled: true },
    { name: "Quarterly Business Review", frequency: "Quarterly", nextRun: "Mar 1, 2025", enabled: false },
    { name: "Daily Project Updates", frequency: "Daily", nextRun: "Dec 6, 2024", enabled: true }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Reports Dashboard
          </h1>
          <p className="text-slate-600 mt-1">Generate, manage, and download comprehensive business reports</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <span className="text-xs text-emerald-600 font-medium">
                      {stat.change} {stat.period}
                    </span>
                  </div>
                </div>
                <FileBarChart className="w-8 h-8 text-slate-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Types Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((type, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                  <type.icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary">{type.count}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-semibold">{type.title}</h3>
                <p className="text-sm text-slate-600">{type.description}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Updated {type.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Report Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recent">Recent Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="space-y-4">
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:border-slate-200 hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>Type: {report.type}</span>
                          <span>By: {report.generatedBy}</span>
                          <span>Size: {report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={
                          report.status === "completed" ? "default" : 
                          report.status === "generating" ? "secondary" : "outline"
                        }
                        className={
                          report.status === "completed" 
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : report.status === "generating"
                            ? "bg-amber-100 text-amber-700 border-amber-200"
                            : ""
                        }
                      >
                        {report.status === "generating" && (
                          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-1" />
                        )}
                        {report.status}
                      </Badge>
                      <div className="text-sm text-slate-500">{report.date}</div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled" className="space-y-4">
              <div className="space-y-3">
                {scheduledReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${report.enabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>Frequency: {report.frequency}</span>
                          <span>Next run: {report.nextRun}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={report.enabled ? "default" : "secondary"}>
                        {report.enabled ? "Active" : "Disabled"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Financial Analysis</h3>
                        <p className="text-sm text-slate-600">Comprehensive financial reporting</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">Use Template</Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                        <PieChart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Project Overview</h3>
                        <p className="text-sm text-slate-600">Project status and metrics</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">Use Template</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="h-64 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">Report analytics will be displayed here</p>
                  <p className="text-xs text-slate-400 mt-1">Usage patterns, performance metrics, and insights</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}