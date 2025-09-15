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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Search, Plus, Send, Paperclip, Image, File, Video, Mic, Phone,
  MoreVertical, Settings, Archive, Trash2, Star, Reply, Forward,
  Download, Share2, Flag, Check, CheckCheck, Clock, AlertCircle,
  Users, Hash, Lock, Unlock, Bell, BellOff, Pin, Edit, Copy,
  MessageSquare, Mail, MessagesSquare, User, UserPlus, LogOut,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Filter,
  Smile, Link, Code, Bold, Italic, Underline, List, ListOrdered,
  Quote, Minus, MoreHorizontal, Circle, Info, ExternalLink,
  Bookmark, Heart, ThumbsUp, ThumbsDown, Eye, EyeOff, RefreshCw,
  Calendar, MapPin, Zap, Shield, Activity, Globe, Folder, Tag
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";

interface Message {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: "online" | "offline" | "away" | "busy";
  };
  content: string;
  timestamp: Date;
  read: boolean;
  delivered: boolean;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
    url: string;
  }>;
  reactions?: Array<{
    emoji: string;
    users: string[];
  }>;
  replyTo?: string;
  edited?: boolean;
  editedAt?: Date;
}

interface Conversation {
  id: string;
  type: "direct" | "group" | "channel";
  name: string;
  avatar?: string;
  participants: Array<{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    status: "online" | "offline" | "away" | "busy";
  }>;
  lastMessage?: {
    content: string;
    sender: string;
    timestamp: Date;
  };
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const conversations: Conversation[] = [
  {
    id: "1",
    type: "direct",
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    participants: [
      { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com", status: "online", role: "Project Manager" },
      { id: "current", name: "You", email: "you@company.com", status: "online" }
    ],
    lastMessage: {
      content: "Great work on the dashboard! The client loved it.",
      sender: "Sarah Chen",
      timestamp: new Date(2024, 0, 15, 14, 30)
    },
    unreadCount: 2,
    pinned: true,
    muted: false,
    archived: false,
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 0, 15, 14, 30)
  },
  {
    id: "2",
    type: "group",
    name: "Development Team",
    participants: [
      { id: "2", name: "Mike Johnson", email: "mike.j@company.com", status: "online", role: "Lead Developer" },
      { id: "3", name: "Emily Davis", email: "emily.d@company.com", status: "away", role: "Frontend Developer" },
      { id: "4", name: "Alex Kim", email: "alex.k@company.com", status: "busy", role: "Backend Developer" },
      { id: "5", name: "Lisa Wang", email: "lisa.w@company.com", status: "offline", role: "UI Designer" }
    ],
    lastMessage: {
      content: "Code review meeting at 3 PM today",
      sender: "Mike Johnson",
      timestamp: new Date(2024, 0, 15, 13, 15)
    },
    unreadCount: 5,
    pinned: true,
    muted: false,
    archived: false,
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2024, 0, 15, 13, 15)
  },
  {
    id: "3",
    type: "channel",
    name: "#general",
    participants: [
      { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com", status: "online" },
      { id: "2", name: "Mike Johnson", email: "mike.j@company.com", status: "online" },
      { id: "3", name: "Emily Davis", email: "emily.d@company.com", status: "away" },
      { id: "4", name: "Alex Kim", email: "alex.k@company.com", status: "busy" },
      { id: "5", name: "Lisa Wang", email: "lisa.w@company.com", status: "offline" },
      { id: "6", name: "Tom Brown", email: "tom.b@company.com", status: "online" }
    ],
    lastMessage: {
      content: "Welcome to the team, Tom! 🎉",
      sender: "Sarah Chen",
      timestamp: new Date(2024, 0, 15, 10, 0)
    },
    unreadCount: 12,
    pinned: false,
    muted: false,
    archived: false,
    createdAt: new Date(2023, 9, 1),
    updatedAt: new Date(2024, 0, 15, 10, 0)
  },
  {
    id: "4",
    type: "channel",
    name: "#project-ecommerce",
    participants: [
      { id: "1", name: "Sarah Chen", email: "sarah.chen@company.com", status: "online" },
      { id: "2", name: "Mike Johnson", email: "mike.j@company.com", status: "online" },
      { id: "3", name: "Emily Davis", email: "emily.d@company.com", status: "away" }
    ],
    lastMessage: {
      content: "Deployment scheduled for tomorrow at 2 PM",
      sender: "Mike Johnson",
      timestamp: new Date(2024, 0, 14, 16, 45)
    },
    unreadCount: 0,
    pinned: false,
    muted: false,
    archived: false,
    createdAt: new Date(2023, 11, 10),
    updatedAt: new Date(2024, 0, 14, 16, 45)
  },
  {
    id: "5",
    type: "direct",
    name: "Client - TechCorp CEO",
    participants: [
      { id: "7", name: "John Smith", email: "ceo@techcorp.com", status: "offline", role: "CEO - TechCorp" },
      { id: "current", name: "You", email: "you@company.com", status: "online" }
    ],
    lastMessage: {
      content: "Looking forward to the presentation tomorrow",
      sender: "John Smith",
      timestamp: new Date(2024, 0, 13, 18, 20)
    },
    unreadCount: 0,
    pinned: false,
    muted: false,
    archived: false,
    createdAt: new Date(2023, 11, 20),
    updatedAt: new Date(2024, 0, 13, 18, 20)
  }
];

const messages: Message[] = [
  {
    id: "1",
    conversationId: "1",
    sender: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "/avatars/sarah.jpg",
      status: "online"
    },
    content: "Hi! How's the progress on the e-commerce platform?",
    timestamp: new Date(2024, 0, 15, 14, 0),
    read: true,
    delivered: true
  },
  {
    id: "2",
    conversationId: "1",
    sender: {
      id: "current",
      name: "You",
      email: "you@company.com",
      status: "online"
    },
    content: "Hi Sarah! We've completed the authentication module and are now working on the product catalog. Should be ready for review by end of week.",
    timestamp: new Date(2024, 0, 15, 14, 15),
    read: true,
    delivered: true,
    edited: true,
    editedAt: new Date(2024, 0, 15, 14, 16)
  },
  {
    id: "3",
    conversationId: "1",
    sender: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "/avatars/sarah.jpg",
      status: "online"
    },
    content: "Excellent! The client will be happy to hear that. Can you share the latest mockups?",
    timestamp: new Date(2024, 0, 15, 14, 20),
    read: true,
    delivered: true,
    reactions: [
      { emoji: "👍", users: ["current"] }
    ]
  },
  {
    id: "4",
    conversationId: "1",
    sender: {
      id: "current",
      name: "You",
      email: "you@company.com",
      status: "online"
    },
    content: "Sure! Here are the latest designs:",
    timestamp: new Date(2024, 0, 15, 14, 25),
    read: true,
    delivered: true,
    attachments: [
      { name: "Homepage_Design_v3.fig", size: "12.5 MB", type: "design", url: "#" },
      { name: "Product_Catalog_Mockup.png", size: "3.2 MB", type: "image", url: "#" }
    ]
  },
  {
    id: "5",
    conversationId: "1",
    sender: {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      avatar: "/avatars/sarah.jpg",
      status: "online"
    },
    content: "Great work on the dashboard! The client loved it. Let's schedule a meeting tomorrow to discuss the next steps.",
    timestamp: new Date(2024, 0, 15, 14, 30),
    read: false,
    delivered: true,
    reactions: [
      { emoji: "🎉", users: ["current"] },
      { emoji: "💯", users: ["2", "3"] }
    ]
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "unread" | "archived">("all");

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = searchQuery === "" ||
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesView =
      (viewMode === "all" && !conv.archived) ||
      (viewMode === "unread" && conv.unreadCount > 0 && !conv.archived) ||
      (viewMode === "archived" && conv.archived);
    return matchesSearch && matchesView;
  });

  const conversationMessages = messages.filter(msg => msg.conversationId === selectedConversation.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "busy": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "direct": return User;
      case "group": return Users;
      case "channel": return Hash;
      default: return MessageSquare;
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <Filter className="h-4 w-4" />
              </Button>
              <Dialog open={showNewMessage} onOpenChange={setShowNewMessage}>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription>
                      Start a new conversation or create a group
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>To</Label>
                      <Command>
                        <CommandInput placeholder="Search people..." />
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem>Sarah Chen</CommandItem>
                          <CommandItem>Mike Johnson</CommandItem>
                          <CommandItem>Emily Davis</CommandItem>
                          <CommandItem>Alex Kim</CommandItem>
                        </CommandGroup>
                      </Command>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Type your message..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewMessage(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowNewMessage(false)}>
                      Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {conversations.filter(c => c.unreadCount > 0).length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1">
                    {conversations.filter(c => c.unreadCount > 0).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map(conversation => {
              const Icon = getConversationIcon(conversation.type);
              const isSelected = selectedConversation.id === conversation.id;

              return (
                <div
                  key={conversation.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors",
                    isSelected && "bg-accent"
                  )}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="relative">
                    {conversation.type === "direct" ? (
                      <Avatar>
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    {conversation.type === "direct" && (
                      <div className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                        getStatusColor(conversation.participants[0].status)
                      )} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{conversation.name}</span>
                        {conversation.pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                        {conversation.muted && <BellOff className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      {conversation.lastMessage && (
                        <span className="text-xs text-muted-foreground">
                          {format(conversation.lastMessage.timestamp, "HH:mm")}
                        </span>
                      )}
                    </div>
                    {conversation.lastMessage && (
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.sender}: {conversation.lastMessage.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="ml-2">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedConversation.type === "direct" ? (
              <Avatar>
                <AvatarImage src={selectedConversation.avatar} />
                <AvatarFallback>
                  {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                {getConversationIcon(selectedConversation.type) === Hash ? (
                  <Hash className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Users className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{selectedConversation.name}</h3>
                {selectedConversation.type === "direct" && (
                  <div className="flex items-center gap-1">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      getStatusColor(selectedConversation.participants[0].status)
                    )} />
                    <span className="text-xs text-muted-foreground">
                      {selectedConversation.participants[0].status}
                    </span>
                  </div>
                )}
              </div>
              {selectedConversation.type !== "direct" && (
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.participants.length} members
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pin className="h-4 w-4 mr-2" />
                  Pin Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Mute Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {conversationMessages.map(message => {
              const isCurrentUser = message.sender.id === "current";

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    isCurrentUser && "flex-row-reverse"
                  )}
                >
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>
                        {message.sender.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={cn(
                    "flex flex-col gap-1 max-w-[70%]",
                    isCurrentUser && "items-end"
                  )}>
                    {!isCurrentUser && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{message.sender.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(message.timestamp, "HH:mm")}
                        </span>
                      </div>
                    )}

                    <div className={cn(
                      "rounded-lg px-3 py-2",
                      isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <p className="text-sm">{message.content}</p>
                      {message.edited && (
                        <span className="text-xs opacity-70">(edited)</span>
                      )}
                    </div>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-col gap-2 mt-2">
                        {message.attachments.map((attachment, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 border rounded-lg bg-background"
                          >
                            {attachment.type === "image" ? (
                              <Image className="h-4 w-4 text-muted-foreground" />
                            ) : attachment.type === "design" ? (
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <File className="h-4 w-4 text-muted-foreground" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.size}</p>
                            </div>
                            <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {message.reactions.map((reaction, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs"
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.users.length}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={cn(
                      "flex items-center gap-2 text-xs text-muted-foreground",
                      isCurrentUser && "flex-row-reverse"
                    )}>
                      {isCurrentUser && (
                        <>
                          {message.delivered && <Check className="h-3 w-3" />}
                          {message.read && <CheckCheck className="h-3 w-3" />}
                          <span>{format(message.timestamp, "HH:mm")}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ToggleGroup type="multiple" size="sm">
                  <ToggleGroupItem value="bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                <Separator orientation="vertical" className="h-6" />
                <Button size="icon" variant="ghost">
                  <Link className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Code className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <List className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Quote className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="min-h-[80px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                  }
                }}
              />
              <div className="flex items-center gap-2 mt-2">
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Image className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button size="lg" disabled={!messageInput.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>

      {showInfo && (
        <div className="w-80 border-l flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Details</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowInfo(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {selectedConversation.type === "direct" ? (
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>
                      {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold mt-3">{selectedConversation.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.participants[0].role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.participants[0].email}
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium mb-3">Members ({selectedConversation.participants.length})</h4>
                  <div className="space-y-3">
                    {selectedConversation.participants.map(participant => (
                      <div key={participant.id} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />
                          <AvatarFallback>
                            {participant.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{participant.name}</p>
                          <p className="text-xs text-muted-foreground">{participant.role}</p>
                        </div>
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          getStatusColor(participant.status)
                        )} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Shared Files</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">Project_Brief.pdf</p>
                      <p className="text-xs text-muted-foreground">2.3 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent cursor-pointer">
                    <Image className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm">Dashboard_Screenshot.png</p>
                      <p className="text-xs text-muted-foreground">1.5 MB</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-2" size="sm">
                  View All Files
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications" className="text-sm">Notifications</Label>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pin" className="text-sm">Pin Conversation</Label>
                    <Switch id="pin" defaultChecked={selectedConversation.pinned} />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}