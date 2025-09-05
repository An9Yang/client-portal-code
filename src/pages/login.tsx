/**
 * Login Page - Beautiful glassmorphism authentication interface
 * 
 * Features:
 * - Stunning gradient background with animated elements
 * - Frosted glass login card
 * - Responsive design for all devices
 * - Professional branding and visual hierarchy
 * - Smooth animations and micro-interactions
 */
import { Link } from "react-router-dom";
import { GradientBackground } from "@/components/gradient-background";
import { GlassCard } from "@/components/glass-card";
import { LoginForm } from "@/components/auth/login-form";
import { Building2, Shield, Users, Zap } from "lucide-react";

export default function Login() {
  return (
    <GradientBackground variant="login" className="flex items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block text-white space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold">Client Portal Pro</h1>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              Sophisticated project management and collaboration platform designed for seamless agency-client workflows.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Real-time Collaboration</h3>
                <p className="text-white/80">Track project progress with live updates and instant notifications.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Secure File Management</h3>
                <p className="text-white/80">Enterprise-grade security for all your sensitive project deliverables.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Role-based Access</h3>
                <p className="text-white/80">Granular permissions ensure the right people see the right information.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <GlassCard variant="card" size="lg" className="w-full">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Client Portal Pro</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your project dashboard</p>
            </div>
            
            <LoginForm />
            
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>Need help accessing your account?</p>
              <Link to="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </GradientBackground>
  );
}