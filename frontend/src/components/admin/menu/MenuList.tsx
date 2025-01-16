import { useState } from 'react';
import { Menu, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import type { MenuItem } from '../../../types/Menu';

interface MenuListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
  onToggleVisibility: (id: number, isVisible: boolean) => void;
}

export function MenuList({ items, onEdit, onDelete, onToggleVisibility }: MenuListProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const childItems = items.filter(i => i.parentId === item.id);
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id} className="border-b border-gray-200 last:border-b-0">
        <div className={`flex items-center justify-between p-4 ${level > 0 ? 'pl-8' : ''}`}>
          <div className="flex items-center gap-2">
            {childItems.length > 0 && (
              <button
                onClick={() => toggleExpand(item.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Menu className="h-4 w-4" />
              </button>
            )}
            <span className="font-medium">{item.name}</span>
            <span className="text-sm text-gray-500">{item.path}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleVisibility(item.id, !item.isVisible)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title={item.isVisible ? 'Hide menu' : 'Show menu'}
            >
              {item.isVisible ? (
                <Eye className="h-4 w-4 text-green-600" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400" />
              )}
            </button>
            <button
              onClick={() => onEdit(item)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Edit menu"
            >
              <Edit2 className="h-4 w-4 text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Delete menu"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>
        
        {isExpanded && childItems.length > 0 && (
          <div className="border-l-2 border-gray-100 ml-4">
            {childItems.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootItems = items.filter(item => !item.parentId);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {rootItems.map(item => renderMenuItem(item))}
    </div>
  );
}