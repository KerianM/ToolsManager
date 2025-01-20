export interface Card {
  id: number;
  name: string;
  description: string;
  category_id: number;
  preview_url: string;
  download_url: string;
  markdown_content: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCardData {
  id: number;
  name: string;
  description: string;
  category_id: number;
  preview_url: string;
  download_url: string;
  markdown_content: string;
  status: number;
}

export interface UpdateCardData {
  name: string;
  description: string;
  category_id: number;
  preview_url: string;
  download_url: string;
  markdown_content: string;
  status: number;
}