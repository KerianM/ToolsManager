import { Eye, Download, Edit2, Trash2 } from 'lucide-react';
import { formatDate } from '../../../utils/date';
import type { Card } from '../../../types/Card';

interface CardListProps {
  cards: Card[];
  onEdit: (card: Card) => void;
  onDelete: (id: number) => void;
}

const STATUS_LABELS: Record<number, string> = {
  0: '草稿',
  1: '已发布',
  2: '已禁用'
};

export function CardList({ cards, onEdit, onDelete }: CardListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cards.map((card) => (
            <tr key={card.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={card.preview_url}
                  alt={card.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{card.name}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 truncate max-w-xs">
                  {card.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  card.status === 1 
                    ? 'bg-green-100 text-green-800'
                    : card.status === 0
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {STATUS_LABELS[card.status] || '未知状态'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {formatDate(card.created_at)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {formatDate(card.updated_at)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(card)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit card"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this card?')) {
                        onDelete(card.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                    title="Delete card"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <a
                    href={card.preview_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900"
                    title="View preview"
                  >
                    <Eye className="h-5 w-5" />
                  </a>
                  <a
                    href={card.download_url}
                    className={`text-green-600 hover:text-green-900 ${card.status !== 1 ? 'pointer-events-none opacity-50' : ''}`}
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}