export interface User {
  id: number;
  username: string;
  real_name: string;
  allow_download: boolean;
  max_daily_downloads: number;
  status: string;
}

export interface CreateUserData {
  username: string;
  password: string;
  real_name: string;
  allow_download: number; // Changed to number (0 or 1)
  max_daily_downloads: number;
}

export interface UpdateUserData {
  username: string;
  password?: string;
  real_name: string;
  allow_download: number; // Changed to number (0 or 1)
  max_daily_downloads: number;
  status: string;
}