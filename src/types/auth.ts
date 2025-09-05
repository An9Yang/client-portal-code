/**
 * Authentication Type Definitions
 * 
 * Defines the core data structures for user authentication and authorization:
 * - User profiles with role-based permissions
 * - Authentication state management
 * - Project access controls
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "agency_admin" | "agency_member" | "client_admin" | "client_member";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthErrorResponse {
  error: string;
  message: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  clientCompany: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";

export interface ProjectAccess {
  projectId: string;
  userId: string;
  role: UserRole;
  permissions: Permission[];
}

export type Permission = 
  | "view_project"
  | "edit_project"
  | "manage_tasks"
  | "upload_files"
  | "approve_files"
  | "manage_team"
  | "view_timeline"
  | "edit_timeline";

// Auth Context Interface
export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  hasPermission: (permission: Permission, projectId?: string) => boolean;
  isClientUser: () => boolean;
  isAgencyUser: () => boolean;
}