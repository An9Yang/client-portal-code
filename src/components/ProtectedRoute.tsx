import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spin } from '@arco-design/web-react';
import { useAuthStore } from '@/stores/auth';

export default function ProtectedRoute() {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <Spin size={32} tip="Loading..." />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}