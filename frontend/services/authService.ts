import { API_CONFIG } from '../config/api';
import type { LoginCredentials, UserInfo } from '../types/Auth';

const TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';

export const authService = {
  async login(credentials: LoginCredentials): Promise<string> {
    const response = await fetch(`${API_CONFIG.baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    this.setToken(data.token);
    this.setUserInfo({
      username: credentials.username,
      isAdmin: credentials.username === 'admin'
    });
    return data.token;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_INFO_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getUserInfo(): UserInfo | null {
    const info = localStorage.getItem(USER_INFO_KEY);
    return info ? JSON.parse(info) : null;
  },

  setUserInfo(userInfo: UserInfo) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};