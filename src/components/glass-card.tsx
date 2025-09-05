/**
 * Glass Card Component - Frosted glass effect card with customizable styling
 * 
 * This component creates the signature glassmorphism effect for the client portal:
 * - Semi-transparent background with backdrop blur
 * - Subtle border with glass-like appearance
 * - Soft drop shadows for depth
 * - Responsive padding and styling options
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const glassCardVariants = cva(
  "backdrop-blur-md bg-glass-white border border-glass-border rounded-xl shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-glass-white",
        darker: "bg-glass-white-dark",
        card: "bg-white/20 border-white/30",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(glassCardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };