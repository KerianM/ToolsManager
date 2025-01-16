import { useState, useEffect } from 'react';
import { getSystemInfo } from '../../services/systemService';
import { getSystemStats } from '../../services/statsService';
import { SystemInfoForm } from './system/SystemInfoForm';
import { SystemStats } from './system/SystemStats';
import { SystemResources } from './system/SystemResources';
import type { SystemInfo } from '../../types/SystemInfo';
import type { SystemStats as SystemStatsType } from '../../types/SystemStats';
import toast from 'react-hot-toast';

export function SystemManagement() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [systemStats, setSystemStats] = useState<SystemStatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [info, stats] = await Promise.all([
        getSystemInfo(),
        getSystemStats()
      ]);
      setSystemInfo(info);
      setSystemStats(stats);
    } catch (error) {
      toast.error('获取系统信息失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">系统管理</h2>

      {systemStats && (
        <>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">系统统计</h3>
            <SystemStats stats={systemStats} />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">系统资源</h3>
            <SystemResources stats={systemStats} />
          </div>
        </>
      )}

      {systemInfo && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">系统信息</h3>
          <SystemInfoForm 
            initialData={systemInfo}
            onUpdate={setSystemInfo}
          />
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">系统日志</h3>
        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-auto font-mono text-sm">
          <p className="text-gray-600">[2024-03-21 10:30:15] 系统启动</p>
          <p className="text-gray-600">[2024-03-21 10:30:16] 数据库连接成功</p>
          <p className="text-gray-600">[2024-03-21 10:30:17] 安全协议初始化完成</p>
          {systemInfo && (
            <p className="text-gray-600">
              [{new Date().toLocaleString()}] 系统标题更新为: {systemInfo.title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}