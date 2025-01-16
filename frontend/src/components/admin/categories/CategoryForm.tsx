import { useState } from 'react';
import type { Category, CreateCategoryData, UpdateCategoryData } from '../../../types/Category';

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: CreateCategoryData | UpdateCategoryData) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    is_hidden: initialData?.is_hidden || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_hidden"
          checked={formData.is_hidden === 1}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            is_hidden: e.target.checked ? 1 : 0 
          }))}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="is_hidden" className="text-sm font-medium text-gray-700">
          Hidden
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
          {initialData ? 'Update Category' : 'Create Category'}
        </button>
      </div>
    </form>
  );
}