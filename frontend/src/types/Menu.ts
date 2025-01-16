export interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon?: string;
  parentId?: number | null;
  order: number;
  isVisible: boolean;
}

export interface MenuFormData {
  name: string;
  path: string;
  icon?: string;
  parentId?: number | null;
  order: number;
  isVisible: boolean;
}