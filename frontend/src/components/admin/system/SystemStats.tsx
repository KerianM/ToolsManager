import { Users, FileText, FolderTree, UserCheck } from 'lucide-react';
import type { SystemStats } from '../../../types/SystemStats';

interface SystemStatsProps {
  stats: SystemStats;
}

export function SystemStats({ stats }: SystemStatsProps) {
  const metrics = [
    { 
      label: '总用户数', 
      value: stats.database.users.total,
      icon: Users 
    },
    { 
      label: '活跃用户', 
      value: stats.database.users.active,
      icon: UserCheck 
    },
    { 
      label: '卡片总数', 
      value: stats.database.cards,
      icon: FileText 
    },
    { 
      label: '分类总数', 
      value: stats.database.categories,
      icon: FolderTree 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map(({ label, value, icon: Icon }) => (
        <div key={label} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
            </div>
            <Icon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      ))}
    </div>
  );
}