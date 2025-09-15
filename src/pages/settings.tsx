import React, { useState } from "react";
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
import { cn } from "@/lib/utils";
import {
  User, Mail, Phone, MapPin, Building, Globe, Calendar, Clock,
  Shield, Lock, Key, Eye, EyeOff, Smartphone, Monitor, Tablet,
  Bell, BellOff, Volume2, VolumeX, Mic, MicOff, Video, VideoOff,
  Sun, Moon, Palette, Languages, DollarSign, CreditCard, Receipt,
  Download, Upload, Database, HardDrive, Cloud, Wifi, WifiOff,
  Settings as SettingsIcon, Info, HelpCircle, FileText, Bug,
  ChevronRight, Check, X, AlertTriangle, AlertCircle, CheckCircle2,
  LogOut, Trash2, RefreshCw, Save, Edit, Copy, Share2, ExternalLink,
  Github, Twitter, Linkedin, Facebook, Instagram, Youtube, Chrome,
  Apple, Windows, Linux, Android, Zap, Activity, BarChart3, PieChart,
  Users, UserPlus, UserMinus, UserCheck, UserX, Heart, Star,
  MessageSquare, Send, Archive, Package, Briefcase, Home, Navigation
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  timezone: string;
  language: string;
  bio: string;
  joinedDate: Date;
  lastActive: Date;
}

interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: Date;
  current: boolean;
}

interface NotificationSetting {
  id: string;
  category: string;
  email: boolean;
  push: boolean;
  desktop: boolean;
  mobile: boolean;
}

interface IntegrationApp {
  id: string;
  name: string;
  description: string;
  icon: any;
  connected: boolean;
  permissions: string[];
  lastSync?: Date;
}

const userProfile: UserProfile = {
  id: "1",
  name: "John Doe",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  avatar: "/avatars/john.jpg",
  role: "Senior Developer",
  department: "Engineering",
  location: "San Francisco, CA",
  timezone: "America/Los_Angeles",
  language: "English",
  bio: "Passionate about building great products and leading engineering teams.",
  joinedDate: new Date(2022, 5, 15),
  lastActive: new Date()
};

const securitySessions: SecuritySession[] = [
  {
    id: "1",
    device: "MacBook Pro",
    browser: "Chrome 120.0",
    location: "San Francisco, CA",
    ipAddress: "192.168.1.1",
    lastActive: new Date(),
    current: true
  },
  {
    id: "2",
    device: "iPhone 14 Pro",
    browser: "Safari",
    location: "San Francisco, CA",
    ipAddress: "192.168.1.2",
    lastActive: new Date(2024, 0, 14),
    current: false
  },
  {
    id: "3",
    device: "iPad Pro",
    browser: "Safari",
    location: "Los Angeles, CA",
    ipAddress: "192.168.1.3",
    lastActive: new Date(2024, 0, 10),
    current: false
  }
];

const notificationSettings: NotificationSetting[] = [
  {
    id: "1",
    category: "Project Updates",
    email: true,
    push: true,
    desktop: true,
    mobile: true
  },
  {
    id: "2",
    category: "Task Assignments",
    email: true,
    push: true,
    desktop: true,
    mobile: false
  },
  {
    id: "3",
    category: "Messages",
    email: false,
    push: true,
    desktop: true,
    mobile: true
  },
  {
    id: "4",
    category: "Comments & Mentions",
    email: true,
    push: true,
    desktop: false,
    mobile: true
  },
  {
    id: "5",
    category: "Weekly Reports",
    email: true,
    push: false,
    desktop: false,
    mobile: false
  },
  {
    id: "6",
    category: "System Updates",
    email: true,
    push: false,
    desktop: true,
    mobile: false
  }
];

const integrationApps: IntegrationApp[] = [
  {
    id: "1",
    name: "GitHub",
    description: "Connect your GitHub repositories",
    icon: Github,
    connected: true,
    permissions: ["repo", "user"],
    lastSync: new Date(2024, 0, 15, 10, 30)
  },
  {
    id: "2",
    name: "Slack",
    description: "Receive notifications in Slack",
    icon: MessageSquare,
    connected: true,
    permissions: ["chat:write", "channels:read"],
    lastSync: new Date(2024, 0, 15, 9, 0)
  },
  {
    id: "3",
    name: "Google Drive",
    description: "Sync files with Google Drive",
    icon: Cloud,
    connected: false,
    permissions: ["drive.file", "drive.metadata"]
  },
  {
    id: "4",
    name: "Jira",
    description: "Sync tasks with Jira",
    icon: Package,
    connected: false,
    permissions: ["read:jira-work", "write:jira-work"]
  },
  {
    id: "5",
    name: "Figma",
    description: "Import designs from Figma",
    icon: PieChart,
    connected: true,
    permissions: ["file:read"],
    lastSync: new Date(2024, 0, 14, 15, 45)
  },
  {
    id: "6",
    name: "Zoom",
    description: "Schedule and join meetings",
    icon: Video,
    connected: false,
    permissions: ["meeting:write", "user:read"]
  }
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [fontSize, setFontSize] = useState(16);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been successfully changed.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export has been initiated. You'll receive an email when it's ready.",
    });
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("Android")) return Smartphone;
    if (device.includes("iPad") || device.includes("Tablet")) return Tablet;
    return Monitor;
  };

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "security", label: "Security", icon: Shield },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "appearance", label: "Appearance", icon: Palette },
                  { id: "integrations", label: "Integrations", icon: Package },
                  { id: "billing", label: "Billing", icon: CreditCard },
                  { id: "data", label: "Data & Privacy", icon: Database },
                  { id: "advanced", label: "Advanced", icon: SettingsIcon }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-9">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <Button size="sm" variant="outline">
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userProfile.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={userProfile.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={userProfile.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue={userProfile.role} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue={userProfile.department}>
                      <SelectTrigger id="department">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={userProfile.location} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue={userProfile.timezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue={userProfile.language}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    defaultValue={userProfile.bio}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Enable 2FA</div>
                      <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate one-time codes
                      </div>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                  {twoFactorEnabled && (
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertTitle>2FA is enabled</AlertTitle>
                      <AlertDescription>
                        Your account is protected with two-factor authentication.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Manage devices where you're currently logged in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securitySessions.map(session => {
                      const DeviceIcon = getDeviceIcon(session.device);
                      return (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <DeviceIcon className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{session.device}</div>
                              <div className="text-sm text-muted-foreground">
                                {session.browser} • {session.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {session.ipAddress} • Last active: {session.lastActive.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {session.current && (
                              <Badge variant="secondary">Current</Badge>
                            )}
                            {!session.current && (
                              <Button size="sm" variant="outline">
                                <LogOut className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive push notifications on your devices
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Desktop Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Show notifications on your desktop
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Notification Categories</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-center">Email</TableHead>
                          <TableHead className="text-center">Push</TableHead>
                          <TableHead className="text-center">Desktop</TableHead>
                          <TableHead className="text-center">Mobile</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {notificationSettings.map(setting => (
                          <TableRow key={setting.id}>
                            <TableCell className="font-medium">
                              {setting.category}
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox defaultChecked={setting.email} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox defaultChecked={setting.push} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox defaultChecked={setting.desktop} />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox defaultChecked={setting.mobile} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                    Customize the appearance of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Color Theme</Label>
                    <RadioGroup value={theme} onValueChange={(v) => setTheme(v as typeof theme)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                          <Sun className="h-4 w-4" />
                          Light
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                          <Moon className="h-4 w-4" />
                          Dark
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                          <Monitor className="h-4 w-4" />
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                    <Slider
                      id="font-size"
                      min={12}
                      max={20}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(v) => setFontSize(v[0])}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Display Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="compact-mode" className="cursor-pointer">
                          Compact Mode
                        </Label>
                        <Switch
                          id="compact-mode"
                          checked={compactMode}
                          onCheckedChange={setCompactMode}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="animations" className="cursor-pointer">
                          Enable Animations
                        </Label>
                        <Switch id="animations" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sidebar" className="cursor-pointer">
                          Show Sidebar
                        </Label>
                        <Switch id="sidebar" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Apply Changes</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Apps</CardTitle>
                  <CardDescription>
                    Manage third-party applications connected to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {integrationApps.map(app => {
                      const Icon = app.icon;
                      return (
                        <div
                          key={app.id}
                          className="p-4 border rounded-lg space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-muted rounded-lg">
                                <Icon className="h-6 w-6" />
                              </div>
                              <div>
                                <h4 className="font-medium">{app.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {app.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          {app.connected ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                                Connected
                              </div>
                              {app.lastSync && (
                                <p className="text-xs text-muted-foreground">
                                  Last synced: {app.lastSync.toLocaleString()}
                                </p>
                              )}
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Sync
                                </Button>
                                <Button size="sm" variant="outline">
                                  Disconnect
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button size="sm" className="w-full">
                              Connect
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 border rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Professional Plan</h3>
                        <p className="text-muted-foreground">$29/month</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Unlimited projects
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Advanced analytics
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        Priority support
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline">
                      Change Plan
                    </Button>
                    <Button variant="outline">
                      Cancel Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Update your payment information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/24</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View and download your past invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Jan 1, 2024</TableCell>
                        <TableCell>Professional Plan</TableCell>
                        <TableCell>$29.00</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Paid</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dec 1, 2023</TableCell>
                        <TableCell>Professional Plan</TableCell>
                        <TableCell>$29.00</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Paid</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "data" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control how your data is collected and used
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Analytics</div>
                      <div className="text-sm text-muted-foreground">
                        Help us improve by sending anonymous usage data
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Personalization</div>
                      <div className="text-sm text-muted-foreground">
                        Use your data to personalize your experience
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Marketing</div>
                      <div className="text-sm text-muted-foreground">
                        Receive marketing communications
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>
                    Export or delete your account data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Export Your Data</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download a copy of all your data in JSON format
                    </p>
                    <Button onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  <div className="p-4 border border-destructive/50 rounded-lg">
                    <h4 className="font-medium mb-2 text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data
                    </p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive">Delete Account</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Developer Settings</CardTitle>
                  <CardDescription>
                    Advanced settings for developers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">API Access</div>
                      <div className="text-sm text-muted-foreground">
                        Enable API access for third-party integrations
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Debug Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Show detailed error messages and logs
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Auto-save</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically save changes as you work
                      </div>
                    </div>
                    <Switch
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for external integrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="font-mono text-sm">
                        sk_live_****************************3456
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate New Key
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>
                    Technical details about your environment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version</span>
                      <span className="font-mono">v2.4.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Build</span>
                      <span className="font-mono">20240115-1234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Environment</span>
                      <span className="font-mono">Production</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Browser</span>
                      <span className="font-mono">Chrome 120.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">OS</span>
                      <span className="font-mono">macOS 14.2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}