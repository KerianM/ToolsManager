export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || '',
  endpoints: {
    cards: '/api/cards',
    cardDetails: (id: number) => `/api/cards/${id}`,
    cardDownload: (id: number) => `/api/cards/${id}/download`,
  }
};
