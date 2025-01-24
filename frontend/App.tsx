import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { CardGrid } from './components/CardGrid';
import { CategoryNav } from './components/CategoryNav';
import { useCards } from './hooks/useCards';
import { useCategories } from './hooks/useCategories';
import { useSystemInfo } from './hooks/useSystemInfo';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AuthButton } from './components/AuthButton';
import { ToasterConfig } from './components/ToasterConfig';
import { Announcement } from './components/Announcement';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { cards, loading: cardsLoading } = useCards();
  const { categories, loading: categoriesLoading } = useCategories();
  const { systemInfo, loading: systemLoading } = useSystemInfo();

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === null || card.category_id === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (cardsLoading || categoriesLoading || systemLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen relative">
      {/* 背景图片层 */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: systemInfo?.background_url ? `url(${systemInfo.background_url})` : undefined,
        }}
      />
      {/* 半透明遮罩层 */}
      <div className="fixed inset-0 bg-white/25" />
      
      {/* 内容层 */}
      <div className="relative z-10">
        <ToasterConfig />
        <header className="bg-white/50 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {systemInfo?.title || '加载中...'}
              </h1>
              <AuthButton />
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <CardGrid cards={filteredCards} />
        </main>

        {systemInfo?.announcement && (
          <Announcement message={systemInfo.announcement} />
        )}
      </div>
    </div>
  );
}