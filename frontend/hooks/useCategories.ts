import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '../services/categoryService';
import type { Category } from '../types/Category';
import toast from 'react-hot-toast';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories';
      setError(err instanceof Error ? err : new Error(errorMessage));
      //toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const refetch = useCallback(async () => {
    setLoading(true);
    return fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch };
}