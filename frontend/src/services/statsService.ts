import { API_CONFIG } from '../config/api';
import { fetchWithAuth } from '../utils/api';
import type { SystemStats } from '../types/SystemStats';

export async function getSystemStats(): Promise<SystemStats> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/stats`);
  return response;
}