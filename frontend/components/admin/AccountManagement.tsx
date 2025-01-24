import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { UserList } from './users/UserList';
import { CreateUserForm } from './users/CreateUserForm';
import { EditUserForm } from './users/EditUserForm';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import { LoadingSpinner } from '../LoadingSpinner';
import toast from 'react-hot-toast';
import type { User, CreateUserData, UpdateUserData } from '../../types/User';

export function AccountManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  }

  const handleCreateUser = async (userData: CreateUserData) => {
    try {
      await createUser(userData);
      await fetchUsers();
      setShowCreateForm(false);
      toast.success('用户创建成功');
    } catch (error) {
      toast.error('用户创建失败');
    }
  };

  const handleUpdateUser = async (id: number, userData: UpdateUserData) => {
    try {
      await updateUser(id, userData);
      await fetchUsers();
      setEditingUser(null);
      toast.success('用户更新成功');
    } catch (error) {
      toast.error('用户更新失败');
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      await fetchUsers();
      toast.success('用户删除成功');
    } catch (error) {
      toast.error('用户删除失败');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">账户管理</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          添加用户
        </button>
      </div>

      {showCreateForm ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">创建新用户</h3>
          <CreateUserForm
            onSubmit={handleCreateUser}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      ) : editingUser ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">编辑用户</h3>
          <EditUserForm
            user={editingUser}
            onSubmit={handleUpdateUser}
            onCancel={() => setEditingUser(null)}
          />
        </div>
      ) : (
        <UserList 
          users={users}
          onEdit={setEditingUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}