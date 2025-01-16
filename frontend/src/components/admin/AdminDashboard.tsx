import { useState } from 'react';
import { Settings, Users, Files, FolderTree, ArrowLeft } from 'lucide-react';
import { AdminRoute } from './AdminRoute';
import { SystemManagement } from './admin/SystemManagement';
import { AccountManagement } from './admin/AccountManagement';
import { CardManagement } from './admin/CardManagement';
import { CategoryManagement } from './admin/CategoryManagement';

type Tab = 'system' | 'accounts' | 'cards' | 'categories';

interface AdminDashboardProps {
  onReturn?: () => void;
}

export function AdminDashboard({ onReturn }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('system');

  const tabs = [
    { id: 'system', label: '系统管理', icon: Settings },
    { id: 'accounts', label: '账户管理', icon: Users },
    { id: 'cards', label: '卡片管理', icon: Files },
    { id: 'categories', label: '分类管理', icon: FolderTree },
  ] as const;

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={onReturn}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回主页
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`
                      flex items-center px-6 py-4 border-b-2 text-sm font-medium
                      ${activeTab === id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'system' && <SystemManagement />}
              {activeTab === 'accounts' && <AccountManagement />}
              {activeTab === 'cards' && <CardManagement />}
              {activeTab === 'categories' && <CategoryManagement />}
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}