import { useState } from 'react';
import type { User, UpdateUserData } from '../../../types/User';

interface EditUserFormProps {
  user: User;
  onSubmit: (id: number, data: UpdateUserData) => Promise<void>;
  onCancel: () => void;
}

export function EditUserForm({ user, onSubmit, onCancel }: EditUserFormProps) {
  const [formData, setFormData] = useState<UpdateUserData>({
    username: user.username,
    real_name: user.real_name,
    allow_download: user.allow_download ? 1 : 0,
    max_daily_downloads: user.max_daily_downloads,
    status: user.status,
  });
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updateData: UpdateUserData = {
      ...formData,
      ...(password && { password }),
    };
    await onSubmit(user.id, updateData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password (leave empty to keep current)
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="real_name" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="real_name"
          value={formData.real_name}
          onChange={(e) => setFormData(prev => ({ ...prev, real_name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="User">User</option>
          <option value="Administrator">Administrator</option>
        </select>
      </div>

      <div>
        <label htmlFor="max_daily_downloads" className="block text-sm font-medium text-gray-700">
          Max Daily Downloads
        </label>
        <input
          type="number"
          id="max_daily_downloads"
          value={formData.max_daily_downloads}
          onChange={(e) => setFormData(prev => ({ ...prev, max_daily_downloads: Number(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="allow_download"
          checked={Boolean(formData.allow_download)}
          onChange={(e) => setFormData(prev => ({ ...prev, allow_download: e.target.checked ? 1 : 0 }))}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="allow_download" className="text-sm font-medium text-gray-700">
          Allow Downloads
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
          Update User
        </button>
      </div>
    </form>
  );
}