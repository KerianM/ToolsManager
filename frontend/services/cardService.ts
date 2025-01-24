import { API_CONFIG } from '../config/api';
import { fetchWithAuth } from '../utils/api';
import type { Card, CreateCardData, UpdateCardData } from '../types/Card';

export async function getCards(): Promise<Card[]> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cards}`);
  return response;
}

export async function createCard(cardData: CreateCardData): Promise<Card> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cards}`, {
    method: 'POST',
    body: JSON.stringify(cardData),
  });
  return response;
}

export async function updateCard(id: number, cardData: Partial<UpdateCardData>): Promise<Card> {
  const response = await fetchWithAuth(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cardDetails(id)}`, {
    method: 'PUT',
    body: JSON.stringify(cardData),
  });
  return response;
}

export async function deleteCard(id: number): Promise<void> {
  await fetchWithAuth(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.cardDetails(id)}`, {
    method: 'DELETE',
  });
}