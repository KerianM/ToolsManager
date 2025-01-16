import { API_CONFIG } from '../config/api';
import { fetchWithAuth } from '../utils/api';
import type { Category, CreateCategoryData, UpdateCategoryData } from '../types/Category';

export async function getCategories(): Promise<Category[]> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/categories`);
  return response;
}

export async function createCategory(data: CreateCategoryData): Promise<Category> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/categories`, {
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      is_hidden: data.is_hidden
    }),
  });
  return response;
}

export async function updateCategory(id: number, data: UpdateCategoryData): Promise<Category> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name: data.name,
      is_hidden: data.is_hidden
    }),
  });
  return response;
}

export async function deleteCategory(id: number): Promise<void> {
  await fetchWithAuth(`${API_CONFIG.baseUrl}/api/categories/${id}`, {
    method: 'DELETE',
  });
}