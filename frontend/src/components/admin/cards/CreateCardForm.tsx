import { useState, useEffect } from 'react';
import type { Card, CreateCardData } from '../../../types/Card';

interface CreateCardFormProps {
  initialData?: Card;
  onSubmit: (data: CreateCardData) => Promise<void>;
  onCancel: () => void;
}

export function CreateCardForm({ initialData, onSubmit, onCancel }: CreateCardFormProps) {
  const [formData, setFormData] = useState<CreateCardData>({
    id: initialData?.id || 0,
    name: initialData?.name || '',
    description: initialData?.description || '',
    category_id: initialData?.category_id || 1,
    preview_url: initialData?.preview_url || '',
    download_url: initialData?.download_url || '',
    markdown_content: initialData?.markdown_content || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!initialData && (
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            ID
          </label>
          <input
            type="number"
            id="id"
            value={formData.id}
            onChange={(e) => setFormData(prev => ({ ...prev, id: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="1"
            required
          />
        </div>
      )}

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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
          Category ID
        </label>
        <input
          type="number"
          id="category_id"
          value={formData.category_id}
          onChange={(e) => setFormData(prev => ({ ...prev, category_id: Number(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="1"
          required
        />
      </div>

      <div>
        <label htmlFor="download_url" className="block text-sm font-medium text-gray-700">
          Download URL
        </label>
        <input
          type="url"
          id="download_url"
          value={formData.download_url}
          onChange={(e) => setFormData(prev => ({ ...prev, download_url: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="preview_url" className="block text-sm font-medium text-gray-700">
          Preview URL
        </label>
        <input
          type="url"
          id="preview_url"
          value={formData.preview_url}
          onChange={(e) => setFormData(prev => ({ ...prev, preview_url: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="markdown_content" className="block text-sm font-medium text-gray-700">
          Markdown Content
        </label>
        <textarea
          id="markdown_content"
          value={formData.markdown_content}
          onChange={(e) => setFormData(prev => ({ ...prev, markdown_content: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={6}
          required
        />
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
          {initialData ? 'Update Card' : 'Create Card'}
        </button>
      </div>
    </form>
  );
}