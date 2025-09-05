/**
 * Home Page - Landing page that redirects to login
 * 
 * For now, this page will redirect users to the login page.
 * Later, this will be updated to show appropriate content based on auth state.
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GradientBackground } from "@/components/gradient-background";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  // Auto-redirect to login after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <GradientBackground variant="primary" className="flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <GlassCard variant="card" size="xl" className="w-full">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Client Portal Pro</h1>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome to Your Project Hub
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sophisticated project management and collaboration platform designed for seamless agency-client workflows.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg border border-white/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">Real-time project tracking</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg border border-white/30">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">Secure file management</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/50 rounded-lg border border-white/30">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700">Role-based access control</span>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3"
              >
                Access Your Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Redirecting automatically in a few seconds...
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </GradientBackground>
  );
}