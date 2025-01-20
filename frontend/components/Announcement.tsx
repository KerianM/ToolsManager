import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnnouncementProps {
  message: string;
}

export function Announcement({ message }: AnnouncementProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    // Auto-show animation on mount
    setIsEntering(true);
  }, []);

  const handleClose = () => {
    setIsEntering(false);
    // Wait for exit animation before hiding
    setTimeout(() => setIsVisible(false), 200);
  };

  if (!isVisible || !message) return null;

  return (
    <div 
      className={`
        fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-lg border border-gray-200
        transition-all duration-200 transform
        ${isEntering ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
        title="关闭公告"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="p-4">
        <div className="prose prose-sm max-h-[50vh] overflow-y-auto pr-4">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}