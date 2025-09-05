/**
 * Calendar Page - Calendar view with events and scheduling
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Video,
  Phone,
  MoreVertical,
  Filter,
  Search,
  CalendarDays,
  CalendarX,
  Eye,
  Edit
} from "lucide-react";

export default function CalendarShadcn() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const todayEvents = [
    {
      id: 1,
      title: "Team Standup",
      time: "9:00 AM",
      duration: "30 min",
      type: "meeting",
      location: "Conference Room A",
      attendees: 8,
      priority: "high"
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "2:00 PM",
      duration: "1 hour",
      type: "presentation",
      location: "Virtual",
      attendees: 5,
      priority: "high"
    },
    {
      id: 3,
      title: "Code Review",
      time: "4:00 PM",
      duration: "45 min",
      type: "review",
      location: "Dev Room",
      attendees: 3,
      priority: "medium"
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      title: "Project Planning Session",
      date: "Dec 6, 2024",
      time: "10:00 AM",
      duration: "2 hours",
      type: "planning",
      location: "Conference Room B",
      attendees: 12,
      priority: "high"
    },
    {
      id: 5,
      title: "Design Review",
      date: "Dec 7, 2024",
      time: "3:00 PM",
      duration: "1 hour",
      type: "review",
      location: "Virtual",
      attendees: 6,
      priority: "medium"
    },
    {
      id: 6,
      title: "All Hands Meeting",
      date: "Dec 10, 2024",
      time: "11:00 AM",
      duration: "1 hour",
      type: "meeting",
      location: "Main Auditorium",
      attendees: 50,
      priority: "high"
    }
  ];

  const monthlyStats = [
    {
      title: "Total Events",
      value: "47",
      change: "+8 this month",
      icon: CalendarDays,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Meetings Today",
      value: "6",
      change: "2 upcoming",
      icon: Clock,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "This Week",
      value: "18",
      change: "3 cancelled",
      icon: Calendar,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Free Time",
      value: "4.5h",
      change: "today remaining",
      icon: CalendarX,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return Users;
      case "presentation":
        return Video;
      case "review":
        return Eye;
      case "planning":
        return Calendar;
      default:
        return Clock;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "presentation":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "review":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "planning":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-rose-500";
      case "medium":
        return "border-l-amber-500";
      case "low":
        return "border-l-slate-400";
      default:
        return "border-l-slate-400";
    }
  };

  // Generate calendar days for demo
  const generateCalendarDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Calendar
          </h1>
          <p className="text-slate-600 mt-1">Manage your schedule and upcoming events</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      {/* Calendar Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {monthlyStats.map((stat, index) => (
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

      {/* Main Calendar Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  {currentMonth}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-slate-600">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square p-2 border border-slate-100 rounded cursor-pointer hover:bg-slate-50 transition-colors
                      ${day.getMonth() !== currentDate.getMonth() ? 'text-slate-400' : 'text-slate-900'}
                      ${day.toDateString() === currentDate.toDateString() ? 'bg-blue-100 border-blue-300' : ''}
                    `}
                  >
                    <div className="text-sm font-medium">{day.getDate()}</div>
                    {/* Add some sample events */}
                    {day.getDate() === currentDate.getDate() && day.getMonth() === currentDate.getMonth() && (
                      <div className="mt-1">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mb-1"></div>
                        <div className="w-1 h-1 bg-emerald-500 rounded-full mb-1"></div>
                        <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      </div>
                    )}
                    {day.getDate() === 6 && day.getMonth() === currentDate.getMonth() && (
                      <div className="mt-1">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mb-1"></div>
                        <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                      </div>
                    )}
                    {day.getDate() === 10 && day.getMonth() === currentDate.getMonth() && (
                      <div className="mt-1">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Today's Events & Upcoming */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                {currentDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayEvents.map((event) => {
                  const EventIcon = getEventTypeIcon(event.type);
                  return (
                    <div key={event.id} className={`border-l-4 ${getPriorityColor(event.priority)} pl-4 py-2`}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{event.title}</h3>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{event.time} ({event.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge className={getEventTypeColor(event.type)} variant="outline">
                          <EventIcon className="w-3 h-3 mr-1" />
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const EventIcon = getEventTypeIcon(event.type);
                  return (
                    <div key={event.id} className="border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{event.title}</h3>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{event.time} ({event.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge className={getEventTypeColor(event.type)} variant="outline">
                          <EventIcon className="w-3 h-3 mr-1" />
                          {event.type}
                        </Badge>
                        <span className="text-xs text-slate-500">{event.attendees} attendees</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calendar Views Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="month" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
            
            <TabsContent value="month" className="mt-6">
              <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">Month view is currently displayed above</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="week" className="mt-6">
              <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <CalendarDays className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">Week view will be displayed here</p>
                  <p className="text-xs text-slate-400 mt-1">7-day timeline with hourly slots</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="day" className="mt-6">
              <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">Day view will be displayed here</p>
                  <p className="text-xs text-slate-400 mt-1">Detailed hourly schedule for selected day</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="agenda" className="mt-6">
              <div className="h-48 flex items-center justify-center border border-dashed border-slate-200 rounded-lg">
                <div className="text-center">
                  <CalendarX className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-500">Agenda view will be displayed here</p>
                  <p className="text-xs text-slate-400 mt-1">List view of all upcoming events</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}