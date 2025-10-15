import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { LoginPage } from '@/features/auth/login-page';

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};
