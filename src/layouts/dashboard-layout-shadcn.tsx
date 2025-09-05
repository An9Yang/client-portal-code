/**
 * Dashboard Layout - Modern Shadcn/UI layout with sidebar navigation
 * 
 * Features:
 * - Responsive sidebar with collapsible navigation
 * - User profile and logout functionality
 * - Modern design with smooth animations
 */
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  LayoutDashboard, 
  ChartBar, 
  FileText, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings,
  LogOut,
  Bell,
  ChevronUp,
  Search,
  PlusCircle,
  Sparkles,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    group: "Overview",
    items: [
      { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
      { path: "/analytics", label: "Analytics", icon: ChartBar, badge: null },
      { path: "/reports", label: "Reports", icon: FileText, badge: "New" },
    ]
  },
  {
    group: "Workspace",
    items: [
      { path: "/projects", label: "Projects", icon: Briefcase, badge: "12" },
      { path: "/tasks", label: "Tasks", icon: CheckSquare, badge: "5" },
      { path: "/team", label: "Team", icon: Users, badge: null },
    ]
  },
  {
    group: "Communication",
    items: [
      { path: "/calendar", label: "Calendar", icon: Calendar, badge: null },
      { path: "/messages", label: "Messages", icon: MessageSquare, badge: "3" },
    ]
  }
];

export default function DashboardLayoutShadcn() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(5);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r border-slate-200">
          <SidebarHeader className="border-b border-slate-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 blur-lg opacity-50"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Client Portal
                </h2>
                <p className="text-xs text-slate-500">Enterprise Platform</p>
              </div>
              <Badge variant="secondary" className="bg-teal-100 text-teal-700 border-teal-200">
                <Sparkles className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {menuItems.map((group) => (
              <SidebarGroup key={group.group}>
                <SidebarGroupLabel className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  {group.group}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton 
                          asChild
                          isActive={location.pathname === item.path}
                          className={cn(
                            "transition-all duration-200",
                            location.pathname === item.path &&
                            "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-l-2 border-teal-500"
                          )}
                        >
                          <Link to={item.path}>
                            <item.icon className="w-4 h-4" />
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <Badge 
                                variant={item.badge === "New" ? "default" : "secondary"}
                                className={cn(
                                  "ml-auto h-5",
                                  item.badge === "New" 
                                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0"
                                    : "bg-slate-100 text-slate-600"
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}

            {/* Settings Section */}
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/settings">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200">
            {/* Upgrade Card */}
            <div className="p-3">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5" />
                    <h3 className="font-semibold">Upgrade to Pro</h3>
                  </div>
                  <p className="text-xs text-white/90 mb-3">
                    Unlock advanced features and unlimited projects
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-white text-teal-600 hover:bg-white/90"
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 px-3 py-2 h-auto hover:bg-slate-100"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                      {user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-6">
            <SidebarTrigger className="-ml-2" />
            
            <Separator orientation="vertical" className="h-6" />
            
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects, tasks, or team members..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600">
                <PlusCircle className="w-4 h-4 mr-1" />
                New Project
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto bg-slate-50">
            <div className="container mx-auto p-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}