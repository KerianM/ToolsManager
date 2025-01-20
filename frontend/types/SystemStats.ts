export interface SystemStats {
  total_users: number;
  total_cards: number;
  total_categories: number;
  total_downloads: number;
  active_users: number;
  uptime: string;
  memory: {
    total: number;
    used: number;
    free: number;
  };
  database: {
    size: string;
    connections: number;
  };
}