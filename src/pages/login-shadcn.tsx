/**
 * Login Page - Modern Shadcn/UI authentication interface
 * 
 * Features:
 * - Clean, modern design with subtle gradients
 * - Professional dark theme with sophisticated colors
 * - Responsive design for all devices
 * - Smooth animations and micro-interactions
 */
import { Link } from "react-router-dom";
import { LoginForm } from "@/components/auth/login-form";
import { Building2, Shield, Users, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LoginShadcn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8 text-white">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 blur-lg opacity-50"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-2xl">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Client Portal</h1>
                  <p className="text-slate-400 text-sm">Enterprise Collaboration Platform</p>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 leading-relaxed max-w-md">
                Streamline your agency-client collaboration with our sophisticated project management platform.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Zap,
                  title: "Real-time Updates",
                  description: "Instant notifications and live project tracking",
                  color: "from-amber-500 to-orange-500"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-grade encryption for your sensitive data",
                  color: "from-emerald-500 to-teal-500"
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description: "Seamless communication across all stakeholders",
                  color: "from-violet-500 to-purple-500"
                }
              ].map((feature, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                    <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        {feature.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  SOC 2 Certified
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  GDPR Compliant
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  99.9% Uptime
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Client Portal
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
                  <p className="text-slate-600">Sign in to access your dashboard</p>
                </div>
                
                <LoginForm />
                
                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-2">
                    Need help accessing your account?
                  </p>
                  <Link 
                    to="/support" 
                    className="text-sm font-medium bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent hover:from-teal-700 hover:to-cyan-700 transition-colors"
                  >
                    Contact Support Team
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Trust Indicators */}
            <div className="lg:hidden flex justify-center gap-4 mt-8 flex-wrap">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                SOC 2
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                GDPR
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                99.9% Uptime
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}