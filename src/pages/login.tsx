/**
 * Login Page - Clean, professional shadcn design system
 * Unified version following shadcn.com design principles
 */
import { Link } from "react-router-dom";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.02]" />

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Client Portal
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Enterprise Collaboration Platform
                  </p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Streamline your agency-client collaboration with our professional project management platform.
              </p>
            </div>

            {/* Feature List - Simple and clean */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                <div>
                  <h3 className="font-medium mb-1">Real-time Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Track project progress with live updates and instant notifications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                <div>
                  <h3 className="font-medium mb-1">Enterprise Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Bank-level encryption and compliance with industry standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                <div>
                  <h3 className="font-medium mb-1">Team Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize teams, assign roles, and manage permissions effortlessly.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial - Clean design */}
            <div className="border-l-2 border-slate-200 pl-6 space-y-2">
              <p className="text-muted-foreground italic">
                "This platform has transformed how we collaborate with clients. The interface is intuitive and our productivity has increased significantly."
              </p>
              <div>
                <p className="font-medium text-sm">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">CEO, TechCorp</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 Client Portal. All rights reserved.
          {' · '}
          <Link to="/terms" className="hover:text-slate-900 transition-colors">
            Terms
          </Link>
          {' · '}
          <Link to="/privacy" className="hover:text-slate-900 transition-colors">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}