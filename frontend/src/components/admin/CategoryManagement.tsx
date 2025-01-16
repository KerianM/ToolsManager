import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CategoryList } from './categories/CategoryList';
import { CategoryForm } from './categories/CategoryForm';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';
import { LoadingSpinner } from '../LoadingSpinner';
import { useCategories } from '../../hooks/useCategories';
import toast from 'react-hot-toast';
import type { Category, CreateCategoryData, UpdateCategoryData } from '../../types/Category';

export function CategoryManagement() {
  const { categories, loading, refetch } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleCreateCategory = async (data: CreateCategoryData) => {
    try {
      await createCategory(data);
      await refetch();
      setShowForm(false);
      toast.success('分类创建成功');
    } catch (error) {
      toast.error('分类创建失败');
    }
  };

  const handleUpdateCategory = async (id: number, data: UpdateCategoryData) => {
    try {
      await updateCategory(id, data);
      await refetch();
      setShowForm(false);
      setEditingCategory(null);
      toast.success('分类更新成功');
    } catch (error) {
      toast.error('分类更新失败');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      await refetch();
      toast.success('分类删除成功');
    } catch (error) {
      toast.error('分类删除失败');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">分类管理</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          添加分类
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCategory ? '编辑分类' : '创建新分类'}
          </h3>
          <CategoryForm
            initialData={editingCategory}
            onSubmit={editingCategory 
              ? (data) => handleUpdateCategory(editingCategory.id, data)
              : handleCreateCategory
            }
            onCancel={() => {
              setShowForm(false);
              setEditingCategory(null);
            }}
          />
        </div>
      ) : (
        <CategoryList
          categories={categories}
          onEdit={(category) => {
            setEditingCategory(category);
            setShowForm(true);
          }}
          onDelete={handleDeleteCategory}
        />
      )}
    </div>
  );
}