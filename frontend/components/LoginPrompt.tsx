import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from './LoginModal';

export function LoginPrompt() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-gray-600">
      <LogIn className="h-16 w-16 mb-4 text-gray-400" />
      <h2 className="text-2xl font-semibold mb-2">请登录</h2>
      <p className="mb-4 text-gray-500">登录后查看可用卡片</p>
      <button
        onClick={() => setShowLoginModal(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        登录
      </button>
      
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}