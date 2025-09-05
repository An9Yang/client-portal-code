/**
 * Gradient Background Component - Animated vibrant gradient backgrounds
 * 
 * Creates the stunning backdrop for the client portal with:
 * - Multiple animated gradient layers
 * - Smooth color transitions
 * - Responsive design
 * - Optional floating elements for visual interest
 */
import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "login";
  showFloatingElements?: boolean;
}

export function GradientBackground({
  children,
  className,
  variant = "primary",
  showFloatingElements = true,
}: GradientBackgroundProps) {
  const gradientVariants = {
    primary: "from-gradient-from via-gradient-via to-gradient-to",
    secondary: "from-gradient-secondary-from via-gradient-secondary-via to-gradient-secondary-to",
    login: "from-purple-600 via-blue-600 to-indigo-700",
  };

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Main Gradient Background */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br animate-pulse",
          gradientVariants[variant]
        )}
        style={{
          animationDuration: "8s",
          animationDirection: "alternate",
        }}
      />
      
      {/* Secondary Moving Gradient Layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-tl from-pink-500/30 via-transparent to-cyan-500/30 animate-pulse"
        style={{
          animationDuration: "12s",
          animationDirection: "alternate-reverse",
        }}
      />
      
      {/* Floating Elements */}
      {showFloatingElements && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce" style={{ animationDuration: "6s" }} />
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-300/20 rounded-full blur-lg animate-bounce" style={{ animationDuration: "8s", animationDelay: "2s" }} />
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300/15 rounded-full blur-lg animate-bounce" style={{ animationDuration: "10s", animationDelay: "4s" }} />
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-pink-300/15 rounded-full blur-xl animate-bounce" style={{ animationDuration: "7s", animationDelay: "1s" }} />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}