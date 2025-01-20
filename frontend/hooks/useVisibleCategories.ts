import { useAdmin } from './useAdmin';
import type { Category } from '../types/Category';

export function useVisibleCategories(categories: Category[]) {
  const { isAdmin } = useAdmin();
  
  // Admin sees all categories, regular users only see visible ones
  const visibleCategories = isAdmin 
    ? categories 
    : categories.filter(cat => cat.is_hidden === 0);

  return visibleCategories;
}