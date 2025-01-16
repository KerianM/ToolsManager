import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getCards, createCard, updateCard, deleteCard } from '../../services/cardService';
import { CardList } from './cards/CardList';
import { CreateCardForm } from './cards/CreateCardForm';
import { LoadingSpinner } from '../LoadingSpinner';
import toast from 'react-hot-toast';
import type { Card, CreateCardData, UpdateCardData } from '../../types/Card';

export function CardManagement() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      const data = await getCards();
      setCards(data);
    } catch (error) {
      toast.error('获取卡片列表失败');
    } finally {
      setLoading(false);
    }
  }

  const handleCreateCard = async (cardData: CreateCardData) => {
    try {
      await createCard(cardData);
      await fetchCards();
      setShowForm(false);
      toast.success('卡片创建成功');
    } catch (error) {
      toast.error('卡片创建失败');
    }
  };

  const handleUpdateCard = async (cardData: CreateCardData) => {
    if (!editingCard) return;
    
    try {
      const updateData: UpdateCardData = {
        name: cardData.name,
        description: cardData.description,
        category_id: cardData.category_id,
        preview_url: cardData.preview_url,
        download_url: cardData.download_url,
        markdown_content: cardData.markdown_content,
      };
      
      await updateCard(editingCard.id, updateData);
      await fetchCards();
      setShowForm(false);
      setEditingCard(null);
      toast.success('卡片更新成功');
    } catch (error) {
      toast.error('卡片更新失败');
    }
  };

  const handleDeleteCard = async (id: number) => {
    try {
      await deleteCard(id);
      await fetchCards();
      toast.success('卡片删除成功');
    } catch (error) {
      toast.error('卡片删除失败');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">卡片管理</h2>
        <button
          onClick={() => {
            setEditingCard(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          添加卡片
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCard ? '编辑卡片' : '创建新卡片'}
          </h3>
          <CreateCardForm
            initialData={editingCard}
            onSubmit={editingCard ? handleUpdateCard : handleCreateCard}
            onCancel={() => {
              setShowForm(false);
              setEditingCard(null);
            }}
          />
        </div>
      ) : (
        <CardList
          cards={cards}
          onEdit={(card) => {
            setEditingCard(card);
            setShowForm(true);
          }}
          onDelete={handleDeleteCard}
        />
      )}
    </div>
  );
}