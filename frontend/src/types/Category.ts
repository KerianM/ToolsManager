export interface Category {
  id: number;
  name: string;
  is_hidden: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  is_hidden: number;
}

export interface UpdateCategoryData {
  name: string;
  is_hidden: number;
}