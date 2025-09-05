/**
 * Authentication Routes - Demo authentication with predefined accounts
 * 
 * This module provides demo authentication endpoints for testing the client portal.
 * It includes predefined user accounts with different roles and permissions.
 * 
 * Demo Accounts:
 * - Agency Admin: admin@agency.com / password123
 * - Agency Member: member@agency.com / password123  
 * - Client Admin: admin@client.com / password123
 * - Client Member: member@client.com / password123
 */
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { User, UserRole } from "../../types/auth";

// Demo user database
const DEMO_USERS: Record<string, User & { password: string }> = {
  "admin@agency.com": {
    id: "1",
    email: "admin@agency.com",
    name: "Alex Johnson",
    role: "agency_admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    password: "password123"
  },
  "member@agency.com": {
    id: "2",
    email: "member@agency.com",
    name: "Sarah Wilson",
    role: "agency_member",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    password: "password123"
  },
  "admin@client.com": {
    id: "3",
    email: "admin@client.com",
    name: "Michael Chen",
    role: "client_admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    password: "password123"
  },
  "member@client.com": {
    id: "4",
    email: "member@client.com",
    name: "Emma Rodriguez",
    role: "client_member",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    password: "password123"
  }
};

// Validation schemas
const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false)
});

const TokenPayload = z.object({
  userId: z.string(),
  email: z.string(),
  role: z.string() as z.ZodType<UserRole>
});

// Simple JWT-like token generation (for demo purposes)
function generateToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  return btoa(JSON.stringify(payload));
}

function generateRefreshToken(user: User): string {
  const payload = {
    userId: user.id,
    type: 'refresh',
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  return btoa(JSON.stringify(payload));
}

export function createAuthRoute() {
  const route = new Hono()
    // Login endpoint
    .post("/login", zValidator("json", LoginSchema), async (c) => {
      try {
        const { email, password, rememberMe } = c.req.valid("json");
        
        // Find user in demo database
        const user = DEMO_USERS[email.toLowerCase()];
        
        if (!user || user.password !== password) {
          return c.json(
            { 
              error: "Invalid email or password",
              message: "Please check your credentials and try again." 
            }, 
            401
          );
        }
        
        // Generate tokens
        const token = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        const expiresAt = new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString();
        
        // Remove password from response
        const { password: _, ...userResponse } = user;
        
        return c.json({
          user: userResponse,
          token,
          refreshToken,
          expiresAt
        });
        
      } catch (error) {
        console.error("Login error:", error);
        return c.json(
          { 
            error: "Authentication failed",
            message: "An unexpected error occurred. Please try again." 
          }, 
          500
        );
      }
    })
    
    // Get current user endpoint
    .get("/me", async (c) => {
      try {
        const authHeader = c.req.header("Authorization");
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return c.json({ error: "No authorization token provided" }, 401);
        }
        
        const token = authHeader.substring(7);
        const payload = JSON.parse(atob(token));
        
        // Check if token is expired
        if (payload.exp < Date.now()) {
          return c.json({ error: "Token expired" }, 401);
        }
        
        // Find user
        const user = Object.values(DEMO_USERS).find(u => u.id === payload.userId);
        
        if (!user) {
          return c.json({ error: "User not found" }, 404);
        }
        
        // Remove password from response
        const { password: _, ...userResponse } = user;
        
        return c.json({ user: userResponse });
        
      } catch (error) {
        console.error("Get user error:", error);
        return c.json({ error: "Invalid token" }, 401);
      }
    })
    
    // Logout endpoint
    .post("/logout", async (c) => {
      // In a real app, you'd invalidate the token in a blacklist or database
      return c.json({ message: "Logged out successfully" });
    })
    
    // Get demo accounts info
    .get("/demo-accounts", async (c) => {
      const accounts = Object.values(DEMO_USERS).map(user => {
        const { password: _, ...userInfo } = user;
        return {
          ...userInfo,
          demoPassword: "password123" // Show the demo password for testing
        };
      });
      
      return c.json({ accounts });
    });
    
  return route;
}
