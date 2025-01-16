import { API_CONFIG } from '../config/api';
import { fetchWithAuth } from '../utils/api';
import type { User, CreateUserData, UpdateUserData } from '../types/User';

export async function createUser(userData: CreateUserData): Promise<User> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/users`, {
    method: 'POST',
    body: JSON.stringify({
      ...userData,
      allow_download: userData.allow_download ? 1 : 0, // Convert boolean to number
    }),
  });
  return response;
}

export async function getUsers(): Promise<User[]> {
  const users = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/users`);
  return users.map(user => ({
    ...user,
    allow_download: Boolean(user.allow_download), // Convert number to boolean
  }));
}

export async function updateUser(id: number, userData: UpdateUserData): Promise<User> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      ...userData,
      allow_download: userData.allow_download ? 1 : 0, // Convert boolean to number
    }),
  });
  return response;
}

export async function deleteUser(id: number): Promise<void> {
  await fetchWithAuth(`${API_CONFIG.baseUrl}/api/users/${id}`, {
    method: 'DELETE',
  });
}