import { Clock, HardDrive } from 'lucide-react';
import type { SystemStats } from '../../../types/SystemStats';

interface SystemResourcesProps {
  stats: SystemStats;
}

function formatMemory(mb: number): string {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(2)} GB`;
  }
  return `${mb.toFixed(2)} MB`;
}

function formatUptime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}小时 ${minutes}分钟`;
}

export function SystemResources({ stats }: SystemResourcesProps) {
  const resources = [
    {
      label: '系统运行时间',
      value: formatUptime(stats.uptime),
      icon: Clock,
      details: null,
      status: 'normal'
    },
    {
      label: '内存使用',
      value: `${((stats.memory.used / stats.memory.total) * 100).toFixed(1)}%`,
      icon: HardDrive,
      details: [
        `总内存: ${formatMemory(stats.memory.total)}`,
        `已使用: ${formatMemory(stats.memory.used)}`,
        `空闲: ${formatMemory(stats.memory.free)}`
      ],
      status: stats.memory.used / stats.memory.total > 0.9 ? 'warning' : 'normal'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map(({ label, value, icon: Icon, details, status }) => (
        <div key={label} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <p className={`mt-2 text-2xl font-semibold ${
                status === 'error' ? 'text-red-600' :
                status === 'warning' ? 'text-yellow-600' :
                'text-gray-900'
              }`}>
                {value}
              </p>
            </div>
            <Icon className={`h-8 w-8 ${
              status === 'error' ? 'text-red-500' :
              status === 'warning' ? 'text-yellow-500' :
              'text-blue-500'
            }`} />
          </div>
          {details && (
            <div className="border-t pt-4 mt-4">
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}