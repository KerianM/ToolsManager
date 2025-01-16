import { API_CONFIG } from '../config/api';
import { fetchWithAuth } from '../utils/api';
import type { SystemInfo, UpdateSystemInfoData } from '../types/SystemInfo';

export async function getSystemInfo(): Promise<SystemInfo> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/system-info`);
  return response;
}

export async function updateSystemInfo(data: UpdateSystemInfoData): Promise<SystemInfo> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/system-info`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response;
}