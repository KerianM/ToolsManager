import { useState } from 'react';
import { Card } from '../types/Card';
import { CardItem } from './CardItem';
import { CardModal } from './CardModal';
import { LoginPrompt } from './LoginPrompt';
import { useAuth } from '../hooks/useAuth';

interface CardGridProps {
  cards: Card[];
}

export function CardGrid({ cards }: CardGridProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onClick={setSelectedCard}
          />
        ))}
      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}