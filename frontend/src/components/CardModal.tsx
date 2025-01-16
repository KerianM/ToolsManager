import { useState } from 'react';
import { Download, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { Card } from '../types/Card';
import { checkCanDownload, decreaseDownloadCount } from '../services/downloadService';

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

export function CardModal({ card, onClose }: CardModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      // Check if user can download
      const { canDownload, remainingDownloads } = await checkCanDownload();
      
      if (!canDownload) {
        toast.error('You have reached your daily download limit');
        return;
      }

      // Show remaining downloads
      toast.success(`${remainingDownloads - 1} downloads remaining today`);

      // Decrease download count
      await decreaseDownloadCount();
      
      // Open download in new window
      window.open(card.download_url, '_blank');
    } catch (error) {
      toast.error('Failed to download card');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="absolute right-4 top-4 flex gap-2">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`p-2 rounded-full transition-colors ${
              isDownloading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
            title={isDownloading ? 'Downloading...' : 'Download'}
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <img
          src={card.preview_url}
          alt={card.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        <article className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <ReactMarkdown>{card.markdown_content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}