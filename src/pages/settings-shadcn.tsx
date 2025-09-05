/**
 * Settings Page - Application and user settings management
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
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Phone,
  Camera,
  Save,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Info
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";

export default function SettingsShadcn() {
  const { user } = useAuthStore();

  const settingsStats = [
    {
      title: "Profile Completion",
      value: "85%",
      change: "2 fields missing",
      icon: User,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Security Score",
      value: "92%",
      change: "Very secure",
      icon: Shield,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Notifications",
      value: "12",
      change: "active alerts",
      icon: Bell,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Storage Used",
      value: "2.4GB",
      change: "of 10GB plan",
      icon: Database,
      color: "from-rose-500 to-pink-500"
    }
  ];

  const notifications = [
    { id: 1, type: "Email", title: "Project Updates", enabled: true, description: "Get notified about project milestones and updates" },
    { id: 2, type: "Push", title: "Task Assignments", enabled: true, description: "Receive notifications when tasks are assigned to you" },
    { id: 3, type: "Email", title: "Team Messages", enabled: false, description: "Email notifications for team chat messages" },
    { id: 4, type: "Push", title: "Meeting Reminders", enabled: true, description: "Get reminders before scheduled meetings" },
    { id: 5, type: "Email", title: "Weekly Reports", enabled: true, description: "Receive weekly project progress reports" }
  ];

  const securitySettings = [
    { id: 1, title: "Two-Factor Authentication", description: "Add an extra layer of security to your account", enabled: true, status: "Active" },
    { id: 2, title: "Login Notifications", description: "Get notified of new sign-ins to your account", enabled: true, status: "Active" },
    { id: 3, title: "Session Management", description: "Manage active sessions and devices", enabled: false, status: "Disabled" },
    { id: 4, title: "API Access", description: "Control third-party application access", enabled: false, status: "Disabled" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-600 mt-1">Manage your account, preferences, and security settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <AlertCircle className="w-4 h-4 mr-2" />
            Help
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {settingsStats.map((stat, index) => (
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
              {stat.title === "Profile Completion" && (
                <Progress value={85} className="h-2 mt-3" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settings Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-600" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Picture */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Profile Picture</CardTitle>
                    <CardDescription>Update your avatar and profile image</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name || ""}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email || ""}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Additional Details</CardTitle>
                  <CardDescription>Optional information to complete your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Job Title</label>
                      <input
                        type="text"
                        placeholder="e.g., Project Manager"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Department</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Location</label>
                      <input
                        type="text"
                        placeholder="e.g., New York, NY"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Time Zone</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="space-y-6">
                {/* Password Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Password & Authentication
                    </CardTitle>
                    <CardDescription>Manage your password and authentication methods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Current Password</label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                          <EyeOff className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>

                {/* Security Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Features</CardTitle>
                    <CardDescription>Enable additional security measures for your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {securitySettings.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium">{setting.title}</h3>
                            <p className="text-sm text-slate-600">{setting.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={setting.enabled ? "default" : "secondary"}
                              className={setting.enabled ? "bg-emerald-100 text-emerald-700" : ""}
                            >
                              {setting.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              {setting.enabled ? "Disable" : "Enable"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose how you want to be notified about important updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          {notification.type === "Email" ? (
                            <Mail className="w-5 h-5 text-slate-400" />
                          ) : (
                            <Bell className="w-5 h-5 text-slate-400" />
                          )}
                          <div>
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-slate-600">{notification.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {notification.type}
                          </Badge>
                          <Button
                            variant={notification.enabled ? "default" : "outline"}
                            size="sm"
                            className={notification.enabled ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                          >
                            {notification.enabled ? (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                On
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 mr-1" />
                                Off
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Appearance
                    </CardTitle>
                    <CardDescription>Customize the look and feel of the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Theme</label>
                      <Select defaultValue="light">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Language</label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Regional Settings
                    </CardTitle>
                    <CardDescription>Set your regional preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Date Format</label>
                      <Select defaultValue="mm-dd-yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Currency</label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-6 mt-6">
              <div className="text-center py-12">
                <Database className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm text-slate-500">Billing and subscription management</p>
                <p className="text-xs text-slate-400 mt-1">View your plan, usage, and payment methods</p>
                <Button className="mt-4" variant="outline">
                  <Info className="w-4 h-4 mr-2" />
                  View Billing Details
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}