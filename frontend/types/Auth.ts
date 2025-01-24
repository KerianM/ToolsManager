export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

export interface UserInfo {
  username: string;
  isAdmin: boolean;
}