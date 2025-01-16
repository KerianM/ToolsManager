import { authService } from '../services/authService';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = authService.getToken();
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, { 
    ...options, 
    headers,
  });
  
  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error');
    throw new Error(error);
  }
  
  return response.json();
}