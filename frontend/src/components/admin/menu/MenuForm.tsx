import { useState, useEffect } from 'react';
import type { MenuItem, MenuFormData } from '../../../types/Menu';

interface MenuFormProps {
  item?: MenuItem;
  items: MenuItem[];
  onSubmit: (data: MenuFormData) => void;
  onCancel: () => void;
}

export function MenuForm({ item, items, onSubmit, onCancel }: MenuFormProps) {
  const [formData, setFormData] = useState<MenuFormData>({
    name: '',
    path: '',
    icon: '',
    parentId: null,
    order: 0,
    isVisible: true,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        path: item.path,
        icon: item.icon || '',
        parentId: item.parentId || null,
        order: item.order,
        isVisible: item.isVisible,
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="path" className="block text-sm font-medium text-gray-700">
          Path
        </label>
        <input
          type="text"
          id="path"
          value={formData.path}
          onChange={(e) => setFormData(prev => ({ ...prev, path: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
          Icon (optional)
        </label>
        <input
          type="text"
          id="icon"
          value={formData.icon || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">
          Parent Menu
        </label>
        <select
          id="parentId"
          value={formData.parentId || ''}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            parentId: e.target.value ? Number(e.target.value) : null 
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">None</option>
          {items.map(menuItem => (
            <option key={menuItem.id} value={menuItem.id}>
              {menuItem.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium text-gray-700">
          Order
        </label>
        <input
          type="number"
          id="order"
          value={formData.order}
          onChange={(e) => setFormData(prev => ({ ...prev, order: Number(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isVisible"
          checked={formData.isVisible}
          onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="isVisible" className="text-sm font-medium text-gray-700">
          Visible
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {item ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}