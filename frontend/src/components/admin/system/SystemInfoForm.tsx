import { useState } from 'react';
import type { SystemInfo, UpdateSystemInfoData } from '../../../types/SystemInfo';
import toast from 'react-hot-toast';
import { updateSystemInfo } from '../../../services/systemService';

interface SystemInfoFormProps {
  initialData: SystemInfo;
  onUpdate: (data: SystemInfo) => void;
}

export function SystemInfoForm({ initialData, onUpdate }: SystemInfoFormProps) {
  const [formData, setFormData] = useState<UpdateSystemInfoData>({
    title: initialData.title,
    website_title: initialData.website_title,
    logo_url: initialData.logo_url,
    background_url: initialData.background_url,
    announcement: initialData.announcement,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateSystemInfo(formData);
      onUpdate(updated);
      // Update document title and favicon
      document.title = formData.website_title;
      updateFavicon(formData.logo_url);
      toast.success('系统信息更新成功');
    } catch (error) {
      toast.error('系统信息更新失败');
    }
  };

  const updateFavicon = (logoUrl: string) => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = logoUrl;
    document.head.appendChild(link);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            系统标题
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            显示在页面顶部的主标题
          </p>
        </div>

        <div>
          <label htmlFor="website_title" className="block text-sm font-medium text-gray-700">
            网页标题
          </label>
          <input
            type="text"
            id="website_title"
            value={formData.website_title}
            onChange={(e) => setFormData(prev => ({ ...prev, website_title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            显示在浏览器标签页的标题
          </p>
        </div>

        <div>
          <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">
            网站Logo URL
          </label>
          <input
            type="url"
            id="logo_url"
            value={formData.logo_url}
            onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            显示在浏览器标签页的图标
          </p>
        </div>

        <div>
          <label htmlFor="background_url" className="block text-sm font-medium text-gray-700">
            背景图片 URL
          </label>
          <input
            type="url"
            id="background_url"
            value={formData.background_url}
            onChange={(e) => setFormData(prev => ({ ...prev, background_url: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            网站的背景图片，建议使用高清大图
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="announcement" className="block text-sm font-medium text-gray-700">
          系统公告 (支持 Markdown 格式)
        </label>
        <div className="mt-1">
          <textarea
            id="announcement"
            value={formData.announcement}
            onChange={(e) => setFormData(prev => ({ ...prev, announcement: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={8}
            placeholder="# 公告标题

- 支持 Markdown 格式
- 可以使用标题、列表、链接等
- **支持加粗**和*斜体*文本"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          提示：支持 Markdown 语法，包括标题、列表、链接、加粗、斜体等格式
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          更新系统信息
        </button>
      </div>
    </form>
  );
}