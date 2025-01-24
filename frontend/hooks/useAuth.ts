import { useState, useCallback } from 'react';
import { authService } from '../services/authService';
import type { LoginCredentials, UserInfo } from '../types/Auth';
import toast from 'react-hot-toast';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [userInfo, setUserInfo] = useState<UserInfo | null>(authService.getUserInfo());

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      await authService.login(credentials);
      setIsAuthenticated(true);
      setUserInfo(authService.getUserInfo());
      toast.success('Successfully logged in');
      // Refresh the page after successful login
      window.location.reload();
    } catch (error) {
      toast.error('Invalid credentials');
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setUserInfo(null);
    toast.success('Successfully logged out');
  }, []);

  return {
    isAuthenticated,
    userInfo,
    login,
    logout,
  };
}