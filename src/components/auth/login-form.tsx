/**
 * Login Form Component - Authentication form with validation
 * 
 * Features:
 * - Email/password authentication with demo accounts
 * - Form validation with helpful error messages
 * - Loading states and user feedback
 * - Accessible form design
 * - Remember me functionality
 * - Demo accounts display for testing
 */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, AlertCircle, Users, Copy, Check } from "lucide-react";
import { client } from "@/lib/api";
import { toast } from "sonner";
import type { AuthErrorResponse } from "@/types/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface DemoAccount {
  id: string;
  email: string;
  name: string;
  role: string;
  demoPassword: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoAccounts, setDemoAccounts] = useState<DemoAccount[]>([]);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  // Load demo accounts
  useEffect(() => {
    const loadDemoAccounts = async () => {
      try {
        const response = await client.api.auth["demo-accounts"].$get();
        if (response.ok) {
          const data = await response.json();
          setDemoAccounts(data.accounts);
        }
      } catch (err) {
        console.error("Failed to load demo accounts:", err);
      }
    };
    
    loadDemoAccounts();
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await client.api.auth.login.$post({
        json: data
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Store authentication data
        localStorage.setItem("auth_token", result.token);
        localStorage.setItem("refresh_token", result.refreshToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        toast.success(`Welcome back, ${result.user.name}!`);
        
        // Redirect to dashboard (will be implemented later)
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        const errorData = await response.json() as AuthErrorResponse;
        setError(errorData.message || errorData.error || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Connection failed. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoAccount = (account: DemoAccount) => {
    setValue("email", account.email);
    setValue("password", account.demoPassword);
    setError(null);
    toast.success(`Demo account filled: ${account.name}`);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(text);
      toast.success(`${type} copied to clipboard`);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "agency_admin": return "bg-purple-100 text-purple-800";
      case "agency_member": return "bg-blue-100 text-blue-800";
      case "client_admin": return "bg-green-100 text-green-800";
      case "client_member": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "agency_admin": return "Agency Admin";
      case "agency_member": return "Agency Member";
      case "client_admin": return "Client Admin";
      case "client_member": return "Client Member";
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            {...register("email")}
            className="bg-white/50 border-white/30 focus:bg-white/70"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="bg-white/50 border-white/30 focus:bg-white/70 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
          />
          <Label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember me for 30 days
          </Label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Demo Accounts Section */}
      <div className="pt-6 border-t border-white/20">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          className="w-full bg-white/10 border-white/30 text-gray-700 hover:bg-white/20"
        >
          <Users className="mr-2 h-4 w-4" />
          {showDemoAccounts ? "Hide" : "Show"} Demo Accounts
        </Button>
        
        {showDemoAccounts && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600 text-center">
              Click any account below to auto-fill the login form
            </p>
            <div className="grid gap-2">
              {demoAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 bg-white/30 rounded-lg border border-white/20 hover:bg-white/40 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{account.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(account.role)}`}>
                        {getRoleLabel(account.role)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{account.email}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(account.email, "Email");
                        }}
                        className="p-1 hover:bg-white/30 rounded"
                      >
                        {copiedEmail === account.email ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => fillDemoAccount(account)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Use Account
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50/80 rounded-lg border border-blue-200/50">
              <p className="text-sm text-blue-800">
                <strong>All demo accounts use password:</strong> <code className="bg-blue-100 px-1 rounded">password123</code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}