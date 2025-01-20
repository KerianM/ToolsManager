import { API_CONFIG } from '../config/api';
import { fetchWithAuth } from '../utils/api';

interface DownloadCheckResponse {
  canDownload: boolean;
  remainingDownloads: number;
}

export async function checkCanDownload(): Promise<DownloadCheckResponse> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/downloads/check`);
  return response;
}

export async function decreaseDownloadCount(): Promise<void> {
  await fetchWithAuth(`${API_CONFIG.baseUrl}/api/downloads/decrease`, {
    method: 'POST'
  });
}