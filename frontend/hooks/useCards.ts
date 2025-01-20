import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCards } from '../services/cardService';
import { useAuth } from './useAuth';
import type { Card } from '../types/Card';

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCards();
    } else {
      setCards([]);
      setLoading(false);
      setError(null);
    }
  }, [isAuthenticated]);

  async function fetchCards() {
    setLoading(true);
    try {
      const data = await getCards();
      setCards(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch cards';
      setError(err instanceof Error ? err : new Error(errorMessage));
      //toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return { cards, loading, error };
}