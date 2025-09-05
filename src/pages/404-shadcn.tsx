/**
 * 404 Error Page - Professional error handling with navigation options
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home,
  ArrowLeft,
  Search,
  HelpCircle,
  MessageSquare,
  RefreshCw,
  FileQuestion,
  AlertTriangle,
  Compass
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundShadcn() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: "Dashboard",
      description: "Go back to your main dashboard",
      icon: Home,
      action: () => navigate("/dashboard-shadcn"),
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Projects",
      description: "View your active projects",
      icon: FileQuestion,
      action: () => navigate("/projects"),
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Team",
      description: "Check your team members",
      icon: MessageSquare,
      action: () => navigate("/team"),
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Help Center",
      description: "Get support and documentation",
      icon: HelpCircle,
      action: () => console.log("Help center"),
      color: "from-rose-500 to-pink-500"
    }
  ];

  const commonPages = [
    { name: "Dashboard", path: "/dashboard-shadcn" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
    { name: "Team", path: "/team" },
    { name: "Calendar", path: "/calendar" },
    { name: "Messages", path: "/messages" },
    { name: "Reports", path: "/reports" },
    { name: "Analytics", path: "/analytics" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Main Error Display */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="text-[200px] font-bold text-slate-200 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center animate-pulse">
                <FileQuestion className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-slate-900">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or may have been moved. 
              Don't worry, we'll help you find what you're looking for.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/dashboard-shadcn")}
            >
              <Home className="w-5 h-5 mr-2" />
              Home Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh Page
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              onClick={link.action}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{link.title}</h3>
                <p className="text-sm text-slate-600">{link.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Navigation */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-600" />
                Search Our Site
              </CardTitle>
              <CardDescription>
                Can't find what you're looking for? Try searching for it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search pages, features, help..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Common Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-slate-600" />
                Popular Pages
              </CardTitle>
              <CardDescription>
                Quick access to the most visited sections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {commonPages.map((page, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-left h-auto py-2"
                    onClick={() => navigate(page.path)}
                  >
                    {page.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 mb-2">Need More Help?</h3>
                <p className="text-amber-800 text-sm mb-4">
                  If you're still having trouble finding what you need, our support team is here to help. 
                  You can also check our documentation or contact us directly.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 space-y-2">
          <p>
            Error Code: 404 - Page Not Found
          </p>
          <p>
            If you believe this is an error, please{" "}
            <button 
              className="text-blue-600 hover:text-blue-700 underline"
              onClick={() => console.log("Report error")}
            >
              report this issue
            </button>
            {" "}to our development team.
          </p>
        </div>
      </div>
    </div>
  );
}