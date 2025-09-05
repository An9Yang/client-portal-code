import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import type { User } from '@/types/auth';
import { client } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      
      login: async (email: string, password: string, rememberMe = false) => {
        set({ isLoading: true });
        try {
          console.log('Attempting login with:', { email, rememberMe });
          const response = await client.api.auth.login.$post({
            json: { email, password, rememberMe }
          });
          
          console.log('Login response:', response);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Login data:', data);
            const { user, token, refreshToken } = data;
            
            // Store tokens
            if (rememberMe) {
              Cookies.set('token', token, { expires: 7 });
              Cookies.set('refreshToken', refreshToken, { expires: 30 });
            } else {
              Cookies.set('token', token);
              Cookies.set('refreshToken', refreshToken);
            }
            
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false
            });
            
            console.log('Login successful, user:', user);
          } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            throw new Error(errorData.error || 'Invalid credentials');
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      
      checkAuth: async () => {
        set({ isLoading: true });
        const token = Cookies.get('token');
        
        // Also check localStorage for backward compatibility
        const localToken = localStorage.getItem('auth_token');
        const localUser = localStorage.getItem('user');
        
        if (!token && !localToken) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }
        
        // If we have localStorage data but no cookies, migrate it
        if (!token && localToken && localUser) {
          try {
            const user = JSON.parse(localUser);
            Cookies.set('token', localToken);
            set({
              user,
              token: localToken,
              isAuthenticated: true,
              isLoading: false
            });
            return;
          } catch (e) {
            console.error('Failed to parse user from localStorage:', e);
          }
        }
        
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token || localToken}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              token: token || localToken,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            throw new Error('Invalid token');
          }
        } catch (error) {
          // Clear all auth data
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      },
      
      setUser: (user) => set({ user })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);