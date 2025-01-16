import { useState } from 'react';
import { Plus } from 'lucide-react';
import { MenuList } from './menu/MenuList';
import { MenuForm } from './menu/MenuForm';
import type { MenuItem, MenuFormData } from '../../types/Menu';
import toast from 'react-hot-toast';

const initialMenus: MenuItem[] = [
  { id: 1, name: 'Dashboard', path: '/dashboard', order: 1, isVisible: true },
  { id: 2, name: 'Users', path: '/users', order: 2, isVisible: true },
  { id: 3, name: 'Settings', path: '/settings', order: 3, isVisible: true },
  { id: 4, name: 'Profile', path: '/settings/profile', parentId: 3, order: 1, isVisible: true },
  { id: 5, name: 'Security', path: '/settings/security', parentId: 3, order: 2, isVisible: true },
];

export function MenuManagement() {
  const [menus, setMenus] = useState<MenuItem[]>(initialMenus);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (data: MenuFormData) => {
    if (editingMenu) {
      setMenus(prev => prev.map(menu => 
        menu.id === editingMenu.id ? { ...menu, ...data } : menu
      ));
      toast.success('Menu updated successfully');
    } else {
      const newMenu: MenuItem = {
        ...data,
        id: Math.max(...menus.map(m => m.id)) + 1,
      };
      setMenus(prev => [...prev, newMenu]);
      toast.success('Menu created successfully');
    }
    setShowForm(false);
    setEditingMenu(null);
  };

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setMenus(prev => prev.filter(menu => menu.id !== id));
    toast.success('Menu deleted successfully');
  };

  const handleToggleVisibility = (id: number, isVisible: boolean) => {
    setMenus(prev => prev.map(menu =>
      menu.id === id ? { ...menu, isVisible } : menu
    ));
    toast.success(`Menu ${isVisible ? 'shown' : 'hidden'} successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        <button
          onClick={() => {
            setEditingMenu(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Menu
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingMenu ? 'Edit Menu' : 'Create Menu'}
          </h3>
          <MenuForm
            item={editingMenu || undefined}
            items={menus.filter(m => m.id !== editingMenu?.id)}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingMenu(null);
            }}
          />
        </div>
      ) : (
        <MenuList
          items={menus}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleVisibility={handleToggleVisibility}
        />
      )}
    </div>
  );
}