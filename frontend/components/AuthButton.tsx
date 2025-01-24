import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { useAuth } from '../hooks/useAuth';
import { UserMenu } from './UserMenu';

export function AuthButton() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <>
          <UserMenu />
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowLoginModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          title="Login"
        >
          <LogIn className="h-5 w-5" />
        </button>
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}