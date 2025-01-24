import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { useVisibleCategories } from '../hooks/useVisibleCategories';
import type { Category } from '../types/Category';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const visibleCategories = useVisibleCategories(categories);

  return (
    <nav className="bg-white shadow-sm rounded-lg mb-6 overflow-hidden">
      {/* Mobile dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        >
          <span className="text-sm font-medium text-gray-700">
            {activeCategory === null 
              ? '全部分类' 
              : categories.find(c => c.id === activeCategory)?.name || '全部分类'
            }
          </span>
          <ChevronDown 
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            <button
              onClick={() => {
                onCategoryChange(null);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2.5 text-sm text-left transition-colors duration-200 ${
                activeCategory === null 
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              全部分类
            </button>
            {visibleCategories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-sm text-left transition-colors duration-200 ${
                  activeCategory === category.id 
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
                {category.is_hidden === 1 && (
                  <span className="ml-2 text-xs text-gray-500">(Hidden)</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop tabs */}
      <div className="hidden md:flex px-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`
            relative px-4 py-3 text-sm font-medium transition-all duration-200
            ${activeCategory === null
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
            }
            before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0
            before:h-0.5 before:bg-blue-600 before:transition-transform before:duration-200
            ${activeCategory === null
              ? 'before:scale-x-100'
              : 'before:scale-x-0 hover:before:scale-x-100'
            }
          `}
        >
          全部分类
        </button>
        {visibleCategories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              relative px-4 py-3 text-sm font-medium transition-all duration-200
              ${activeCategory === category.id
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
              }
              before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0
              before:h-0.5 before:bg-blue-600 before:transition-transform before:duration-200
              ${activeCategory === category.id
                ? 'before:scale-x-100'
                : 'before:scale-x-0 hover:before:scale-x-100'
              }
            `}
          >
            {category.name}
            {category.is_hidden === 1 && (
              <span className="ml-2 text-xs text-gray-500">(Hidden)</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}