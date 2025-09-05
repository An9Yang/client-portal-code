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
        const token = Cookies.get('token');
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }
        
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              token,
              isAuthenticated: true
            });
          } else {
            throw new Error('Invalid token');
          }
        } catch (error) {
          Cookies.remove('token');
          Cookies.remove('refreshToken');
          set({
            user: null,
            token: null,
            isAuthenticated: false
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