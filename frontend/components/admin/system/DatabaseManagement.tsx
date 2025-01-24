import { useState } from 'react';
import { Download, Upload, AlertCircle } from 'lucide-react';
import { API_CONFIG } from '../../../config/api';
import toast from 'react-hot-toast';
import { authService } from '../../../services/authService';

export function DatabaseManagement() {
  const [uploading, setUploading] = useState(false);

  const handleExport = () => {
    const token = authService.getToken();
    if (!token) {
      toast.error('请先登录');
      return;
    }

    // Create a hidden link and trigger download with auth header
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_CONFIG.baseUrl}/api/database/export`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.responseType = 'blob';

    xhr.onload = function() {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: 'application/x-sqlite3' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `database-backup-${new Date().toISOString().split('T')[0]}.sqlite`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        toast.error('导出失败，请确认您有管理员权限');
      }
    };

    xhr.onerror = function() {
      toast.error('导出失败，请检查网络连接');
    };

    xhr.send();
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = authService.getToken();
    if (!token) {
      toast.error('请先登录');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('文件大小超过10MB限制');
      return;
    }

    // Check file extension
    if (!file.name.toLowerCase().endsWith('.sqlite')) {
      toast.error('请选择有效的数据库文件 (.sqlite)');
      return;
    }

    const formData = new FormData();
    formData.append('database', file);

    setUploading(true);
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/api/database/import`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Import failed');
      }

      toast.success('数据库导入成功');
      // Reset file input
      event.target.value = '';
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message === '请先登录' ? '请先登录' : '数据库导入失败');
      } else {
        toast.error('数据库导入失败');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">数据库管理</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Download className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">导出数据库</h4>
              <p className="text-sm text-gray-500">下载数据库的完整备份</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            导出
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Upload className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="text-sm font-medium text-gray-900">导入数据库</h4>
              <p className="text-sm text-gray-500">从备份文件恢复数据库</p>
            </div>
          </div>
          <div>
            <input
              type="file"
              accept=".sqlite"
              onChange={handleImport}
              disabled={uploading}
              className="hidden"
              id="database-import"
            />
            <label
              htmlFor="database-import"
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? '导入中...' : '导入'}
            </label>
          </div>
        </div>

        <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-600">
            <p className="font-medium mb-1">注意事项</p>
            <ul className="list-disc list-inside space-y-1">
              <li>导入操作会覆盖现有数据，请确保已备份重要数据</li>
              <li>数据库文件大小不能超过 10MB</li>
              <li>仅支持 .sqlite 格式的数据库文件</li>
              <li>导入过程中请勿刷新或关闭页面</li>
              <li>仅管理员可以执行导入导出操作</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}