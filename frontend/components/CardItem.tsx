import { Card } from '../types/Card';

interface CardItemProps {
  card: Card;
  onClick: (card: Card) => void;
}

export function CardItem({ card, onClick }: CardItemProps) {
  return (
    <div
      onClick={() => onClick(card)}
      className="group bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-all duration-200 hover:shadow-md hover:scale-102 flex h-28 relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1557683311-eac922347aa1)',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-1/3 relative overflow-hidden">
        <img
          src={card.preview_url}
          alt={card.name}
          className="h-full w-full object-cover transform transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between backdrop-blur-sm bg-white/50">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
            {card.name}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}