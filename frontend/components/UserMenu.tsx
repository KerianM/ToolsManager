import { useState } from 'react';
import { ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAdmin } from '../hooks/useAdmin';
import { AdminDashboard } from './AdminDashboard';

export function UserMenu() {
  const { userInfo } = useAuth();
  const { isAdmin } = useAdmin();
  const [showMenu, setShowMenu] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  if (!userInfo) return null;

  if (showAdminDashboard) {
    return (
      <AdminDashboard 
        onReturn={() => setShowAdminDashboard(false)} 
      />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {userInfo.username}
        <ChevronDown className="h-4 w-4" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          {isAdmin && (
            <button
              onClick={() => {
                setShowAdminDashboard(true);
                setShowMenu(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-4 w-4 mr-2" />
              管理员面板
            </button>
          )}
        </div>
      )}
    </div>
  );
}