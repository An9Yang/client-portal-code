/**
 * Analytics Page - Comprehensive analytics dashboard with charts
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  DollarSign, 
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  Target,
  Eye,
  Clock
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Pie, PieChart as RePieChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AnalyticsShadcn() {
  const performanceMetrics = [
    {
      title: "Revenue Growth",
      value: "$127,450",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Project Completion",
      value: "94.2%",
      change: "+5.1%",
      trend: "up",
      icon: Target,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Client Satisfaction",
      value: "4.8/5.0",
      change: "+0.3",
      trend: "up",
      icon: Activity,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Team Efficiency",
      value: "87%",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const projectAnalytics = [
    { category: "Web Development", count: 15, percentage: 45, color: "bg-emerald-500" },
    { category: "Mobile Apps", count: 8, percentage: 25, color: "bg-violet-500" },
    { category: "Design", count: 6, percentage: 18, color: "bg-amber-500" },
    { category: "Consulting", count: 4, percentage: 12, color: "bg-rose-500" }
  ];

  const timeData = [
    { period: "Q1 2024", revenue: 85000, projects: 8, satisfaction: 4.5 },
    { period: "Q2 2024", revenue: 92000, projects: 10, satisfaction: 4.6 },
    { period: "Q3 2024", revenue: 108000, projects: 12, satisfaction: 4.7 },
    { period: "Q4 2024", revenue: 127000, projects: 15, satisfaction: 4.8 }
  ];

  const topPerformers = [
    { name: "Sarah Wilson", projects: 12, completion: 98, revenue: "$45,200" },
    { name: "Michael Chen", projects: 10, completion: 95, revenue: "$38,500" },
    { name: "Emma Rodriguez", projects: 8, completion: 92, revenue: "$31,800" },
    { name: "Alex Johnson", projects: 9, completion: 90, revenue: "$35,100" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 mt-1">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="90days">
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
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
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
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-rose-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      metric.trend === "up" ? "text-emerald-600" : "text-rose-600"
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-slate-500">vs last period</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-emerald-600" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Quarterly revenue performance over time</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="period" 
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {timeData.map((period, index) => (
                <div key={index} className="p-2 bg-slate-50 rounded">
                  <p className="text-xs text-slate-600 font-medium">{period.period}</p>
                  <p className="text-sm font-bold">${(period.revenue / 1000).toFixed(0)}k</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Distribution Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-violet-600" />
                  Project Distribution
                </CardTitle>
                <CardDescription>Breakdown of projects by category</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                projects: {
                  label: "Projects",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-64 mb-4"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={projectAnalytics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#ef4444" />
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="space-y-3">
              {projectAnalytics.map((project, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${project.color}`} />
                    <span className="text-sm font-medium">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">{project.count} projects</span>
                    <Badge variant="secondary">{project.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            Detailed Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Average Project Value</p>
                        <p className="text-2xl font-bold">$8,497</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Delivery Time</p>
                        <p className="text-2xl font-bold">21 days</p>
                      </div>
                      <Clock className="w-8 h-8 text-violet-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Client Retention</p>
                        <p className="text-2xl font-bold">89%</p>
                      </div>
                      <Target className="w-8 h-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">Project analytics chart will be displayed here</p>
                  <p className="text-xs text-slate-400 mt-1">Bar chart showing project metrics over time</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Top Performers</h3>
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {performer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{performer.name}</p>
                        <p className="text-sm text-slate-600">{performer.projects} projects completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Completion Rate</p>
                        <p className="font-bold text-emerald-600">{performer.completion}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Revenue</p>
                        <p className="font-bold">{performer.revenue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="clients" className="space-y-4">
              <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">Client analytics will be displayed here</p>
                  <p className="text-xs text-slate-400 mt-1">Client satisfaction and retention metrics</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}