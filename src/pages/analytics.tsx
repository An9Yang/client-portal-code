/**
 * Analytics Page - Business analytics dashboard using shadcn components
 * Follows shadcn design principles with proper chart components
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp, TrendingDown, Users, Briefcase, DollarSign,
  Activity, Calendar, Download, BarChart3, Filter,
  ArrowUp, ArrowDown, AlertCircle, CheckCircle2, XCircle
} from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Revenue data for charts
  const revenueData = [
    { month: "Jan", revenue: 85000, target: 80000, lastYear: 72000 },
    { month: "Feb", revenue: 92000, target: 85000, lastYear: 78000 },
    { month: "Mar", revenue: 98000, target: 90000, lastYear: 83000 },
    { month: "Apr", revenue: 105000, target: 95000, lastYear: 89000 },
    { month: "May", revenue: 118000, target: 100000, lastYear: 95000 },
    { month: "Jun", revenue: 125450, target: 110000, lastYear: 102000 },
  ];

  // Project performance data
  const projectData = [
    { status: "Completed", value: 45, fill: "var(--chart-1)" },
    { status: "In Progress", value: 32, fill: "var(--chart-2)" },
    { status: "Planning", value: 18, fill: "var(--chart-3)" },
    { status: "On Hold", value: 5, fill: "var(--chart-4)" },
  ];

  // Team productivity data
  const teamProductivityData = [
    { name: "Week 1", tasks: 120, hours: 160 },
    { name: "Week 2", tasks: 145, hours: 172 },
    { name: "Week 3", tasks: 138, hours: 165 },
    { name: "Week 4", tasks: 152, hours: 180 },
  ];

  // Client metrics
  const clientMetrics = [
    { month: "Jan", acquisition: 8, retention: 92 },
    { month: "Feb", acquisition: 12, retention: 94 },
    { month: "Mar", acquisition: 10, retention: 91 },
    { month: "Apr", acquisition: 15, retention: 93 },
    { month: "May", acquisition: 18, retention: 95 },
    { month: "Jun", acquisition: 14, retention: 92 },
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--chart-1)",
    },
    target: {
      label: "Target",
      color: "var(--chart-2)",
    },
    lastYear: {
      label: "Last Year",
      color: "var(--chart-3)",
    },
    tasks: {
      label: "Tasks",
      color: "var(--chart-1)",
    },
    hours: {
      label: "Hours",
      color: "var(--chart-2)",
    },
    acquisition: {
      label: "New Clients",
      color: "var(--chart-1)",
    },
    retention: {
      label: "Retention %",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  // Key metrics cards
  const keyMetrics = [
    {
      title: "Monthly Revenue",
      value: "$125,450",
      change: 12.5,
      trend: "up",
      icon: DollarSign,
      target: 150000,
      current: 125450,
    },
    {
      title: "Active Projects",
      value: "24",
      change: 8.3,
      trend: "up",
      icon: Briefcase,
      target: 30,
      current: 24,
    },
    {
      title: "Team Utilization",
      value: "78%",
      change: -2.1,
      trend: "down",
      icon: Users,
      target: 85,
      current: 78,
    },
    {
      title: "Client Satisfaction",
      value: "92%",
      change: 3.2,
      trend: "up",
      icon: Activity,
      target: 95,
      current: 92,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive business performance metrics and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-2 mt-1">
                {metric.trend === "up" ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
              <Progress
                value={(metric.current / metric.target) * 100}
                className="mt-3 h-1"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>
                  Monthly revenue vs target and last year comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      fill="var(--color-revenue)"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="var(--color-target)"
                      fill="var(--color-target)"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>By service category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Web Development</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Mobile Apps</span>
                      <span className="text-sm text-muted-foreground">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Consulting</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Maintenance</span>
                      <span className="text-sm text-muted-foreground">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
                <Separator />
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Revenue</span>
                    <span className="font-semibold">$125,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Recurring Revenue</span>
                    <span className="font-semibold">$45,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>One-time Revenue</span>
                    <span className="font-semibold">$80,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
                <CardDescription>Current project portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Project Metrics</CardTitle>
                <CardDescription>Key project performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">On-time Delivery</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">89%</span>
                      <Badge variant="secondary" className="text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        5%
                      </Badge>
                    </div>
                    <Progress value={89} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Budget Adherence</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">94%</span>
                      <Badge variant="secondary" className="text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        2%
                      </Badge>
                    </div>
                    <Progress value={94} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Resource Utilization</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">78%</span>
                      <Badge variant="secondary" className="text-red-600">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        3%
                      </Badge>
                    </div>
                    <Progress value={78} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Client Approval Rate</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">96%</span>
                      <Badge variant="secondary" className="text-green-600">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        1%
                      </Badge>
                    </div>
                    <Progress value={96} className="h-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Client Metrics</CardTitle>
                <CardDescription>Acquisition and retention trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={clientMetrics}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="acquisition"
                      stroke="var(--color-acquisition)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="retention"
                      stroke="var(--color-retention)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Clients</CardTitle>
                <CardDescription>By revenue contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "TechCorp", revenue: "$45,000", projects: 5, status: "active" },
                    { name: "RetailPlus", revenue: "$38,000", projects: 3, status: "active" },
                    { name: "FinanceHub", revenue: "$32,000", projects: 4, status: "active" },
                    { name: "HealthNet", revenue: "$28,000", projects: 2, status: "inactive" },
                    { name: "EduSmart", revenue: "$22,000", projects: 3, status: "active" },
                  ].map((client, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {client.projects} projects
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{client.revenue}</p>
                        <Badge
                          variant={client.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {client.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Team Productivity</CardTitle>
                <CardDescription>Weekly tasks completed and hours worked</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={teamProductivityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Individual metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Sarah Wilson", utilization: 92, tasks: 45, efficiency: "high" },
                    { name: "Michael Chen", utilization: 88, tasks: 42, efficiency: "high" },
                    { name: "Emma Rodriguez", utilization: 75, tasks: 38, efficiency: "medium" },
                    { name: "Alex Johnson", utilization: 81, tasks: 40, efficiency: "high" },
                    { name: "David Lee", utilization: 69, tasks: 35, efficiency: "medium" },
                  ].map((member, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{member.name}</p>
                        <Badge
                          variant={member.efficiency === "high" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {member.efficiency}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{member.utilization}% utilized</span>
                        <span>{member.tasks} tasks</span>
                      </div>
                      <Progress value={member.utilization} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}