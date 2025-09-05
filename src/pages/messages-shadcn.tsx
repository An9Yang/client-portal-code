/**
 * Messages Page - Team communication and messaging interface
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
  MessageSquare,
  Send,
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Hash,
  Users,
  Bell,
  Settings,
  Star,
  Archive,
  Trash2
} from "lucide-react";

export default function MessagesShadcn() {
  const messageStats = [
    {
      title: "Unread Messages",
      value: "23",
      change: "+5 new today",
      icon: MessageSquare,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Active Chats",
      value: "8",
      change: "3 team channels",
      icon: Users,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Starred",
      value: "12",
      change: "important items",
      icon: Star,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Archived",
      value: "156",
      change: "conversations",
      icon: Archive,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const conversations = [
    {
      id: 1,
      name: "Project Alpha Team",
      type: "group",
      lastMessage: "Sarah: Great work on the presentation!",
      timestamp: "2 min ago",
      unread: 3,
      avatar: "PA",
      status: "online",
      members: 8
    },
    {
      id: 2,
      name: "Michael Chen",
      type: "direct",
      lastMessage: "Can you review the code changes?",
      timestamp: "5 min ago",
      unread: 1,
      avatar: "MC",
      status: "online",
      members: 0
    },
    {
      id: 3,
      name: "Design Team",
      type: "group",
      lastMessage: "Emma: Updated the mockups in Figma",
      timestamp: "15 min ago",
      unread: 0,
      avatar: "DT",
      status: "away",
      members: 6
    },
    {
      id: 4,
      name: "Alex Johnson",
      type: "direct",
      lastMessage: "Thanks for the feedback!",
      timestamp: "1 hour ago",
      unread: 0,
      avatar: "AJ",
      status: "busy",
      members: 0
    },
    {
      id: 5,
      name: "General",
      type: "channel",
      lastMessage: "Lisa: Don't forget about tomorrow's meeting",
      timestamp: "2 hours ago",
      unread: 7,
      avatar: "#G",
      status: "online",
      members: 24
    }
  ];

  const currentMessages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      avatar: "SW",
      content: "Hey team! I wanted to share the latest updates on Project Alpha. We're making great progress!",
      timestamp: "2:30 PM",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      avatar: "ME",
      content: "That's awesome! The client presentation went really well yesterday.",
      timestamp: "2:32 PM",
      isMe: true
    },
    {
      id: 3,
      sender: "Michael Chen",
      avatar: "MC",
      content: "Agreed! I think we're on track for the deadline. Should we schedule a sync meeting for tomorrow?",
      timestamp: "2:35 PM",
      isMe: false
    },
    {
      id: 4,
      sender: "Emma Rodriguez",
      avatar: "ER",
      content: "Sounds good! I'll have the updated designs ready by then.",
      timestamp: "2:36 PM",
      isMe: false
    },
    {
      id: 5,
      sender: "You",
      avatar: "ME",
      content: "Perfect! Let's meet at 10 AM in Conference Room B.",
      timestamp: "2:37 PM",
      isMe: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "busy":
        return "bg-rose-500";
      case "away":
        return "bg-amber-500";
      default:
        return "bg-slate-400";
    }
  };

  const getConversationIcon = (type: string, avatar: string) => {
    if (type === "channel") {
      return (
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
          <Hash className="w-5 h-5 text-slate-600" />
        </div>
      );
    }
    if (type === "group") {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
          {avatar}
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
        {avatar}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-slate-600 mt-1">Stay connected with your team and clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {messageStats.map((stat, index) => (
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

      {/* Main Messages Interface */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Button variant="ghost" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      conversation.id === 1 ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="relative">
                      {getConversationIcon(conversation.type, conversation.avatar)}
                      {conversation.type === "direct" && (
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-white ${getStatusColor(conversation.status)}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{conversation.name}</p>
                        <span className="text-xs text-slate-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 truncate">{conversation.lastMessage}</p>
                      {conversation.type === "group" && (
                        <p className="text-xs text-slate-400">{conversation.members} members</p>
                      )}
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    PA
                  </div>
                  <div>
                    <h3 className="font-semibold">Project Alpha Team</h3>
                    <p className="text-xs text-slate-600">8 members • 3 online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {currentMessages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}>
                    {!message.isMe && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                        {message.avatar}
                      </div>
                    )}
                    <div className={`max-w-[70%] ${message.isMe ? 'text-right' : ''}`}>
                      {!message.isMe && (
                        <p className="text-xs text-slate-600 mb-1">{message.sender}</p>
                      )}
                      <div className={`p-3 rounded-lg ${
                        message.isMe 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Message Features */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="mt-6">
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm text-slate-500">Recent conversations are shown above</p>
              </div>
            </TabsContent>
            
            <TabsContent value="starred" className="mt-6">
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm text-slate-500">Starred messages will appear here</p>
                <p className="text-xs text-slate-400 mt-1">Star important messages to find them easily</p>
              </div>
            </TabsContent>
            
            <TabsContent value="archived" className="mt-6">
              <div className="text-center py-12">
                <Archive className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm text-slate-500">Archived conversations will appear here</p>
                <p className="text-xs text-slate-400 mt-1">Keep your chat list clean by archiving old conversations</p>
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="mt-6">
              <div className="text-center py-12">
                <Paperclip className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm text-slate-500">Shared files will appear here</p>
                <p className="text-xs text-slate-400 mt-1">All files shared in conversations</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}