import { useState, useEffect, useCallback } from 'react';
import { getSystemInfo } from '../services/systemService';
import type { SystemInfo } from '../types/SystemInfo';
import toast from 'react-hot-toast';

export function useSystemInfo() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const updateFavicon = (logoUrl: string) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = logoUrl;
    document.head.appendChild(link);
  };

  const fetchSystemInfo = useCallback(async () => {
    try {
      const info = await getSystemInfo();
      setSystemInfo(info);
      
      // Update document title and favicon when system info is fetched
      if (info.website_title) {
        document.title = info.website_title;
      }
      if (info.logo_url) {
        updateFavicon(info.logo_url);
      }
      
      return info;
    } catch (error) {
      toast.error('获取系统信息失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSystemInfo();
  }, [fetchSystemInfo]);

  const refetch = useCallback(async () => {
    setLoading(true);
    return fetchSystemInfo();
  }, [fetchSystemInfo]);

  return { systemInfo, loading, refetch };
}