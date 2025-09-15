import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, isToday } from "date-fns";
import {
  CalendarDays, Clock, Plus, ChevronLeft, ChevronRight, Users, Video, Phone,
  MapPin, Bell, Repeat, Filter, Search, Download, Upload, Settings,
  User, Calendar as CalendarIcon, List, Grid3X3, MoreHorizontal,
  AlertCircle, CheckCircle2, Info, Edit, Trash2, Copy, Share2,
  Sun, Moon, Sunrise, Sunset, Coffee, Briefcase, Home, Plane,
  Heart, Star, Flag, Bookmark, Archive, Send, Printer, Mail,
  MessageSquare, Paperclip, Link, Eye, EyeOff, Lock, Unlock,
  ChevronDown, ChevronUp, ArrowUp, ArrowDown, X, Check
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  type: "meeting" | "task" | "deadline" | "review" | "presentation" | "training" | "social" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "postponed";
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  organizer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  attendees: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: "accepted" | "declined" | "tentative" | "pending";
    required: boolean;
  }>;
  project?: {
    id: number;
    name: string;
    color: string;
  };
  tags: string[];
  reminder?: {
    type: "email" | "notification" | "both";
    minutes: number;
  };
  recurrence?: {
    type: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    endDate?: Date;
  };
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const events: Event[] = [
  {
    id: "1",
    title: "Sprint Planning Meeting",
    description: "Planning session for Q1 2024 sprint with development team",
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 0, 15),
    startTime: "09:00",
    endTime: "11:00",
    type: "meeting",
    priority: "high",
    status: "scheduled",
    location: "Conference Room A",
    isVirtual: false,
    organizer: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "/avatars/sarah.jpg"
    },
    attendees: [
      { id: "2", name: "Mike Johnson", email: "mike.j@company.com", status: "accepted", required: true },
      { id: "3", name: "Emily Davis", email: "emily.d@company.com", status: "accepted", required: true },
      { id: "4", name: "Alex Kim", email: "alex.k@company.com", status: "tentative", required: false }
    ],
    project: { id: 1, name: "E-Commerce Platform", color: "bg-blue-500" },
    tags: ["sprint", "planning", "development"],
    reminder: { type: "both", minutes: 15 },
    attachments: [
      { name: "Sprint_Backlog.pdf", size: "2.3 MB", type: "pdf" },
      { name: "User_Stories.docx", size: "450 KB", type: "doc" }
    ],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 10)
  },
  {
    id: "2",
    title: "Client Presentation - TechCorp",
    description: "Quarterly review presentation for TechCorp stakeholders",
    startDate: new Date(2024, 0, 16),
    endDate: new Date(2024, 0, 16),
    startTime: "14:00",
    endTime: "15:30",
    type: "presentation",
    priority: "urgent",
    status: "scheduled",
    isVirtual: true,
    meetingLink: "https://zoom.us/j/123456789",
    organizer: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com"
    },
    attendees: [
      { id: "5", name: "Client CEO", email: "ceo@techcorp.com", status: "accepted", required: true },
      { id: "6", name: "Client CTO", email: "cto@techcorp.com", status: "accepted", required: true }
    ],
    project: { id: 1, name: "E-Commerce Platform", color: "bg-blue-500" },
    tags: ["client", "presentation", "quarterly"],
    reminder: { type: "both", minutes: 30 },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 10)
  },
  {
    id: "3",
    title: "Code Review Session",
    description: "Review pull requests for authentication module",
    startDate: new Date(2024, 0, 17),
    endDate: new Date(2024, 0, 17),
    startTime: "10:00",
    endTime: "11:00",
    type: "review",
    priority: "medium",
    status: "scheduled",
    isVirtual: true,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    organizer: {
      id: "2",
      name: "Mike Johnson",
      email: "mike.j@company.com"
    },
    attendees: [
      { id: "3", name: "Emily Davis", email: "emily.d@company.com", status: "accepted", required: true },
      { id: "4", name: "Alex Kim", email: "alex.k@company.com", status: "accepted", required: false }
    ],
    project: { id: 2, name: "Mobile Banking App", color: "bg-green-500" },
    tags: ["code-review", "authentication", "development"],
    reminder: { type: "notification", minutes: 10 },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 10)
  },
  {
    id: "4",
    title: "Project Deadline - Healthcare Dashboard",
    description: "Final delivery deadline for healthcare dashboard MVP",
    startDate: new Date(2024, 0, 20),
    endDate: new Date(2024, 0, 20),
    startTime: "17:00",
    endTime: "17:00",
    type: "deadline",
    priority: "urgent",
    status: "scheduled",
    isVirtual: false,
    organizer: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com"
    },
    attendees: [],
    project: { id: 3, name: "Healthcare Dashboard", color: "bg-purple-500" },
    tags: ["deadline", "mvp", "delivery"],
    reminder: { type: "both", minutes: 1440 },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 10)
  },
  {
    id: "5",
    title: "Team Building Workshop",
    description: "Monthly team building and collaboration workshop",
    startDate: new Date(2024, 0, 18),
    endDate: new Date(2024, 0, 18),
    startTime: "13:00",
    endTime: "17:00",
    type: "training",
    priority: "low",
    status: "scheduled",
    location: "Main Office - Event Space",
    isVirtual: false,
    organizer: {
      id: "7",
      name: "HR Team",
      email: "hr@company.com"
    },
    attendees: [
      { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com", status: "accepted", required: false },
      { id: "2", name: "Mike Johnson", email: "mike.j@company.com", status: "accepted", required: false },
      { id: "3", name: "Emily Davis", email: "emily.d@company.com", status: "tentative", required: false },
      { id: "4", name: "Alex Kim", email: "alex.k@company.com", status: "accepted", required: false }
    ],
    tags: ["team-building", "workshop", "monthly"],
    reminder: { type: "email", minutes: 1440 },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 10)
  },
  {
    id: "6",
    title: "Daily Standup",
    description: "Daily team sync meeting",
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 0, 19),
    startTime: "09:00",
    endTime: "09:15",
    type: "meeting",
    priority: "medium",
    status: "scheduled",
    isVirtual: true,
    meetingLink: "https://meet.google.com/daily-standup",
    organizer: {
      id: "2",
      name: "Mike Johnson",
      email: "mike.j@company.com"
    },
    attendees: [
      { id: "3", name: "Emily Davis", email: "emily.d@company.com", status: "accepted", required: true },
      { id: "4", name: "Alex Kim", email: "alex.k@company.com", status: "accepted", required: true }
    ],
    tags: ["standup", "daily", "agile"],
    recurrence: {
      type: "daily",
      interval: 1,
      endDate: new Date(2024, 0, 31)
    },
    reminder: { type: "notification", minutes: 5 },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 10)
  }
];

const timeSlots = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];

const eventTypeConfig = {
  meeting: { color: "bg-blue-500", icon: Users, label: "Meeting" },
  task: { color: "bg-green-500", icon: CheckCircle2, label: "Task" },
  deadline: { color: "bg-red-500", icon: AlertCircle, label: "Deadline" },
  review: { color: "bg-yellow-500", icon: Eye, label: "Review" },
  presentation: { color: "bg-purple-500", icon: Video, label: "Presentation" },
  training: { color: "bg-indigo-500", icon: Briefcase, label: "Training" },
  social: { color: "bg-pink-500", icon: Heart, label: "Social" },
  other: { color: "bg-gray-500", icon: CalendarDays, label: "Other" }
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day" | "agenda">("month");
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterProject, setFilterProject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);

  const calendarDays = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(monthEnd)
  });

  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: weekEnd
  });

  const filteredEvents = events.filter(event => {
    const matchesType = filterType === "all" || event.type === filterType;
    const matchesProject = filterProject === "all" || event.project?.id.toString() === filterProject;
    const matchesSearch = searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesProject && matchesSearch;
  });

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event =>
      isSameDay(event.startDate, date)
    );
  };

  const navigateDate = (direction: "prev" | "next") => {
    if (view === "month") {
      setCurrentDate(direction === "prev" ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(direction === "prev" ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
    } else if (view === "day") {
      setCurrentDate(direction === "prev" ? subDays(currentDate, 1) : addDays(currentDate, 1));
    }
  };

  const renderMonthView = () => (
    <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
        <div key={day} className="bg-background p-2 text-center text-sm font-medium text-muted-foreground">
          {day}
        </div>
      ))}
      {calendarDays.map((day, idx) => {
        const dayEvents = getEventsForDate(day);
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentDay = isToday(day);

        return (
          <div
            key={idx}
            className={cn(
              "bg-background min-h-[100px] p-2 cursor-pointer hover:bg-accent transition-colors",
              !isCurrentMonth && "opacity-50",
              isSelected && "ring-2 ring-primary",
              isCurrentDay && "bg-accent"
            )}
            onClick={() => setSelectedDate(day)}
          >
            <div className="text-sm font-medium mb-1">
              {format(day, "d")}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map(event => {
                const config = eventTypeConfig[event.type];
                return (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs p-1 rounded truncate text-white cursor-pointer hover:opacity-80",
                      config.color
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                      setShowEventDialog(true);
                    }}
                  >
                    {event.startTime} {event.title}
                  </div>
                );
              })}
              {dayEvents.length > 3 && (
                <div className="text-xs text-muted-foreground">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderWeekView = () => (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-20 flex-shrink-0">
        <div className="h-12 border-b" />
        {timeSlots.map(time => (
          <div key={time} className="h-16 border-b text-xs text-muted-foreground p-2">
            {time}
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 gap-px bg-muted">
        {weekDays.map((day, idx) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentDay = isToday(day);

          return (
            <div key={idx} className="bg-background">
              <div className={cn(
                "h-12 border-b p-2 text-center",
                isCurrentDay && "bg-accent"
              )}>
                <div className="text-sm font-medium">{format(day, "EEE")}</div>
                <div className="text-lg">{format(day, "d")}</div>
              </div>
              <div className="relative">
                {timeSlots.map(time => (
                  <div key={time} className="h-16 border-b" />
                ))}
                {dayEvents.map(event => {
                  const config = eventTypeConfig[event.type];
                  const startHour = parseInt(event.startTime.split(":")[0]);
                  const endHour = parseInt(event.endTime.split(":")[0]);
                  const duration = endHour - startHour || 1;

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute left-1 right-1 p-1 rounded text-white text-xs cursor-pointer hover:opacity-80 overflow-hidden",
                        config.color
                      )}
                      style={{
                        top: `${startHour * 64 + 4}px`,
                        height: `${duration * 64 - 8}px`
                      }}
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventDialog(true);
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="truncate">{event.startTime} - {event.endTime}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);

    return (
      <div className="flex flex-1 overflow-hidden">
        <div className="w-20 flex-shrink-0">
          {timeSlots.map(time => (
            <div key={time} className="h-20 border-b text-sm text-muted-foreground p-2">
              {time}
            </div>
          ))}
        </div>
        <div className="flex-1 relative bg-background">
          {timeSlots.map(time => (
            <div key={time} className="h-20 border-b" />
          ))}
          {dayEvents.map(event => {
            const config = eventTypeConfig[event.type];
            const startHour = parseInt(event.startTime.split(":")[0]);
            const startMinute = parseInt(event.startTime.split(":")[1]);
            const endHour = parseInt(event.endTime.split(":")[0]);
            const endMinute = parseInt(event.endTime.split(":")[1]);
            const startPos = startHour * 80 + (startMinute / 60) * 80;
            const endPos = endHour * 80 + (endMinute / 60) * 80;
            const height = endPos - startPos || 80;

            return (
              <div
                key={event.id}
                className={cn(
                  "absolute left-4 right-4 p-3 rounded-lg text-white cursor-pointer hover:opacity-90",
                  config.color
                )}
                style={{
                  top: `${startPos + 4}px`,
                  height: `${height - 8}px`
                }}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventDialog(true);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-sm opacity-90">
                      {event.startTime} - {event.endTime}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    )}
                    {event.isVirtual && event.meetingLink && (
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <Video className="h-3 w-3" />
                        Virtual Meeting
                      </div>
                    )}
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {event.priority}
                  </Badge>
                </div>
                {event.attendees.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <Users className="h-3 w-3" />
                    <span className="text-sm">{event.attendees.length} attendees</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    const upcomingEvents = filteredEvents
      .filter(event => event.startDate >= new Date())
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return (
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {upcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming events</p>
              </CardContent>
            </Card>
          ) : (
            upcomingEvents.map(event => {
              const config = eventTypeConfig[event.type];
              const Icon = config.icon;

              return (
                <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventDialog(true);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-lg text-white", config.color)}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {event.description}
                            </p>
                          </div>
                          <Badge variant={
                            event.priority === "urgent" ? "destructive" :
                            event.priority === "high" ? "default" :
                            "secondary"
                          }>
                            {event.priority}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" />
                            {format(event.startDate, "MMM d, yyyy")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.startTime} - {event.endTime}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                          {event.isVirtual && (
                            <div className="flex items-center gap-1">
                              <Video className="h-4 w-4" />
                              Virtual
                            </div>
                          )}
                        </div>

                        {event.attendees.length > 0 && (
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex -space-x-2">
                              {event.attendees.slice(0, 4).map(attendee => (
                                <Avatar key={attendee.id} className="h-6 w-6 border-2 border-background">
                                  <AvatarImage src={attendee.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {attendee.name.split(" ").map(n => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            {event.attendees.length > 4 && (
                              <span className="text-sm text-muted-foreground">
                                +{event.attendees.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        {event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {event.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="font-medium">
              {view === "month" && format(currentDate, "MMMM yyyy")}
              {view === "week" && `Week of ${format(weekStart, "MMM d, yyyy")}`}
              {view === "day" && format(currentDate, "EEEE, MMMM d, yyyy")}
              {view === "agenda" && "Upcoming Events"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[200px]"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(eventTypeConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterProject} onValueChange={setFilterProject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="1">E-Commerce Platform</SelectItem>
              <SelectItem value="2">Mobile Banking App</SelectItem>
              <SelectItem value="3">Healthcare Dashboard</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Schedule a new event or meeting
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Event title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Event description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Pick a date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Pick a date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(eventTypeConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
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
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Event location" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="virtual" />
                  <Label htmlFor="virtual">Virtual Event</Label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meeting-link">Meeting Link</Label>
                  <Input id="meeting-link" placeholder="https://..." />
                </div>
                <div className="grid gap-2">
                  <Label>Attendees</Label>
                  <Input placeholder="Search and add attendees..." />
                </div>
                <div className="grid gap-2">
                  <Label>Reminder</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Set reminder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes before</SelectItem>
                      <SelectItem value="15">15 minutes before</SelectItem>
                      <SelectItem value="30">30 minutes before</SelectItem>
                      <SelectItem value="60">1 hour before</SelectItem>
                      <SelectItem value="1440">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {view === "month" && renderMonthView()}
        {view === "week" && renderWeekView()}
        {view === "day" && renderDayView()}
        {view === "agenda" && renderAgendaView()}
      </div>

      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant={
                  selectedEvent.priority === "urgent" ? "destructive" :
                  selectedEvent.priority === "high" ? "default" :
                  "secondary"
                }>
                  {selectedEvent.priority} priority
                </Badge>
                <Badge variant="outline">
                  {eventTypeConfig[selectedEvent.type].label}
                </Badge>
                <Badge variant={
                  selectedEvent.status === "completed" ? "default" :
                  selectedEvent.status === "cancelled" ? "destructive" :
                  "secondary"
                }>
                  {selectedEvent.status}
                </Badge>
              </div>

              <Separator />

              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(selectedEvent.startDate, "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </span>
                </div>
                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.isVirtual && selectedEvent.meetingLink && (
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <a href={selectedEvent.meetingLink} className="text-sm text-primary hover:underline">
                      Join Virtual Meeting
                    </a>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2">Organizer</h4>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedEvent.organizer.avatar} />
                    <AvatarFallback>
                      {selectedEvent.organizer.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{selectedEvent.organizer.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedEvent.organizer.email}</p>
                  </div>
                </div>
              </div>

              {selectedEvent.attendees.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Attendees ({selectedEvent.attendees.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedEvent.attendees.map(attendee => (
                        <div key={attendee.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={attendee.avatar} />
                              <AvatarFallback>
                                {attendee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{attendee.name}</p>
                              <p className="text-xs text-muted-foreground">{attendee.email}</p>
                            </div>
                          </div>
                          <Badge variant={
                            attendee.status === "accepted" ? "default" :
                            attendee.status === "declined" ? "destructive" :
                            "secondary"
                          }>
                            {attendee.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedEvent.attachments.map((attachment, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{attachment.name}</span>
                            <span className="text-xs text-muted-foreground">({attachment.size})</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
