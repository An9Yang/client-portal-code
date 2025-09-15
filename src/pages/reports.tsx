/**
 * Reports Page - Comprehensive reporting system for agency management
 * Provides various report types, scheduling, and export capabilities
 */
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText, Download, Clock, Calendar, Filter, Search, Plus,
  TrendingUp, Users, Briefcase, DollarSign, BarChart3, PieChart,
  FileSpreadsheet, FileJson, Mail, Settings, ChevronRight,
  CheckCircle2, AlertCircle, Info, Archive,
  CalendarDays, Timer, Eye, Send, Printer, Share2, Activity
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Reports() {
  const [selectedReportType, setSelectedReportType] = useState("executive");
  const [dateRange, setDateRange] = useState("last-month");
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  // Predefined report templates
  const reportTemplates = [
    {
      id: "executive",
      name: "Executive Summary",
      description: "High-level overview of business performance",
      icon: TrendingUp,
      sections: ["Revenue", "Projects", "Clients", "Team"],
      frequency: "Monthly",
      lastGenerated: "Dec 1, 2024",
      status: "ready"
    },
    {
      id: "financial",
      name: "Financial Report",
      description: "Detailed financial analysis and projections",
      icon: DollarSign,
      sections: ["P&L", "Cash Flow", "Receivables", "Forecast"],
      frequency: "Monthly",
      lastGenerated: "Dec 1, 2024",
      status: "ready"
    },
    {
      id: "project",
      name: "Project Status Report",
      description: "Complete project tracking and milestones",
      icon: Briefcase,
      sections: ["Active Projects", "Completed", "At Risk", "Timeline"],
      frequency: "Weekly",
      lastGenerated: "Dec 5, 2024",
      status: "ready"
    },
    {
      id: "team",
      name: "Team Performance Report",
      description: "Individual and team productivity metrics",
      icon: Users,
      sections: ["Productivity", "Utilization", "Goals", "Reviews"],
      frequency: "Bi-weekly",
      lastGenerated: "Dec 1, 2024",
      status: "ready"
    },
    {
      id: "client",
      name: "Client Analysis Report",
      description: "Client satisfaction and engagement metrics",
      icon: BarChart3,
      sections: ["Satisfaction", "Retention", "Growth", "Feedback"],
      frequency: "Quarterly",
      lastGenerated: "Oct 1, 2024",
      status: "outdated"
    },
    {
      id: "custom",
      name: "Custom Report",
      description: "Build your own report with selected metrics",
      icon: Settings,
      sections: ["Customizable"],
      frequency: "On-demand",
      lastGenerated: "Never",
      status: "new"
    }
  ];

  // Recent reports history
  const recentReports = [
    {
      name: "November Executive Summary",
      type: "Executive",
      date: "Dec 1, 2024",
      size: "2.4 MB",
      format: "PDF",
      status: "completed",
      recipients: ["CEO", "CFO", "Board"]
    },
    {
      name: "Q3 Financial Report",
      type: "Financial",
      date: "Oct 15, 2024",
      size: "3.8 MB",
      format: "Excel",
      status: "completed",
      recipients: ["Finance Team", "Investors"]
    },
    {
      name: "Weekly Project Status",
      type: "Project",
      date: "Dec 5, 2024",
      size: "1.2 MB",
      format: "PDF",
      status: "completed",
      recipients: ["All Teams"]
    },
    {
      name: "Team Performance Review",
      type: "Team",
      date: "Nov 30, 2024",
      size: "1.8 MB",
      format: "PDF",
      status: "completed",
      recipients: ["HR", "Managers"]
    },
    {
      name: "Client Satisfaction Q3",
      type: "Client",
      date: "Oct 1, 2024",
      size: "956 KB",
      format: "PDF",
      status: "completed",
      recipients: ["Sales", "Support"]
    }
  ];

  // Scheduled reports
  const scheduledReports = [
    {
      name: "Monthly Executive Summary",
      schedule: "1st of every month",
      nextRun: "Jan 1, 2025",
      recipients: 5,
      format: "PDF",
      status: "active"
    },
    {
      name: "Weekly Project Status",
      schedule: "Every Monday",
      nextRun: "Dec 9, 2024",
      recipients: 12,
      format: "PDF",
      status: "active"
    },
    {
      name: "Bi-weekly Team Report",
      schedule: "Every 2 weeks",
      nextRun: "Dec 15, 2024",
      recipients: 8,
      format: "Excel",
      status: "active"
    },
    {
      name: "Quarterly Financial Report",
      schedule: "Every quarter",
      nextRun: "Jan 1, 2025",
      recipients: 3,
      format: "PDF",
      status: "paused"
    }
  ];

  // Report metrics for custom builder
  const availableMetrics = {
    revenue: [
      "Monthly Recurring Revenue",
      "Annual Recurring Revenue",
      "Revenue Growth",
      "Revenue by Client",
      "Revenue by Project Type"
    ],
    projects: [
      "Active Projects",
      "Completed Projects",
      "Project Timeline",
      "Project Budget Status",
      "Project Profitability"
    ],
    clients: [
      "Client Satisfaction Score",
      "Client Retention Rate",
      "Net Promoter Score",
      "Client Lifetime Value",
      "Client Acquisition Cost"
    ],
    team: [
      "Team Utilization",
      "Individual Productivity",
      "Task Completion Rate",
      "Overtime Hours",
      "Skills Matrix"
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'outdated':
        return <Badge className="bg-amber-100 text-amber-800">Outdated</Badge>;
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'paused':
        return <Badge className="bg-gray-100 text-gray-800">Paused</Badge>;
      case 'completed':
        return <Badge className="bg-slate-100 text-slate-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'excel':
        return <FileSpreadsheet className="h-4 w-4" />;
      case 'csv':
        return <FileText className="h-4 w-4" />;
      case 'json':
        return <FileJson className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate, schedule, and manage comprehensive business reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">3 active, 1 paused</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Report Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Across all reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">Weekly status report</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Builder</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <template.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(template.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-medium">{template.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Generated:</span>
                      <span className="font-medium">{template.lastGenerated}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Sections included:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="mr-2 h-3 w-3" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="mr-2 h-3 w-3" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Custom Builder Tab */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>
                Select metrics and configure your custom report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Configuration */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input
                    id="report-name"
                    placeholder="Enter report name"
                    defaultValue="Custom Report - December 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger id="date-range">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Metrics Selection */}
              <div className="space-y-4">
                <Label>Select Metrics to Include</Label>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(availableMetrics).map(([category, metrics]) => (
                    <div key={category} className="space-y-2">
                      <p className="text-sm font-medium capitalize">{category}</p>
                      <div className="space-y-2">
                        {metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Checkbox id={`${category}-${idx}`} />
                            <Label
                              htmlFor={`${category}-${idx}`}
                              className="text-xs font-normal cursor-pointer"
                            >
                              {metric}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="flex gap-2">
                  {['PDF', 'Excel', 'CSV', 'JSON'].map((format) => (
                    <Button
                      key={format}
                      variant={selectedFormat === format.toLowerCase() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFormat(format.toLowerCase())}
                    >
                      {getFormatIcon(format.toLowerCase())}
                      <span className="ml-2">{format}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Report
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Generate & Download
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Generate & Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Templates</CardTitle>
              <CardDescription>Start with a pre-configured template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-3">
                <Button variant="outline" className="justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Performance Overview
                </Button>
                <Button variant="outline" className="justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Financial Summary
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Team Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Report History</CardTitle>
                  <CardDescription>Previously generated reports</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-8 w-[200px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded">
                          {getFormatIcon(report.format)}
                        </div>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {report.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {report.date}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {report.size}
                            </span>
                            {getStatusBadge(report.status)}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">Recipients:</span>
                            <div className="flex -space-x-2">
                              {report.recipients.slice(0, 3).map((recipient, idx) => (
                                <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback className="text-xs">
                                    {recipient.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {report.recipients.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                                  +{report.recipients.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Most Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">Weekly Project Status</p>
                <p className="text-xs text-muted-foreground">52 times this year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Average Size</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">2.1 MB</p>
                <p className="text-xs text-muted-foreground">Per report</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">319 MB</p>
                <p className="text-xs text-muted-foreground">152 reports</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Automated report generation</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{schedule.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {schedule.schedule}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Next: {schedule.nextRun}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {schedule.recipients} recipients
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {schedule.format}
                          </Badge>
                          {getStatusBadge(schedule.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // Toggle pause/resume
                        }}
                      >
                        {schedule.status === 'active' ? 'Pause' : 'Resume'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Report Schedule</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Weekly Project Status</p>
                      <p className="text-xs text-muted-foreground">In 2 hours</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Today</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Bi-weekly Team Report</p>
                      <p className="text-xs text-muted-foreground">Dec 15, 9:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline">In 3 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Monthly Executive Summary</p>
                      <p className="text-xs text-muted-foreground">Jan 1, 12:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="outline">Next month</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common reporting tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Generate Monthly Summary
          </Button>
          <Button variant="outline" size="sm">
            <Send className="mr-2 h-4 w-4" />
            Email Last Report
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="mr-2 h-4 w-4" />
            Archive Old Reports
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}