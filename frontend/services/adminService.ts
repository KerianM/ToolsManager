import { API_CONFIG } from '../config/api';
import { fetchWithAuth } from '../utils/api';

export async function checkIsAdmin(): Promise<boolean> {
  try {
    const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/users/check-admin`);
    return response.isAdmin;
  } catch (error) {
    return false;
  }
}