import { Layers2, Pencil, Edit3, FolderOpen, Plus } from 'lucide-react';
import React from 'react';

const CategoryList = ({ categories, onEditCategory, onDeleteCategory, onAddCategory }) => {
  // Check if categories is valid
  const isCategoriesEmpty = !categories || categories.length === 0;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 shadow-sm">
            <FolderOpen size={20} className="text-purple-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Category Sources</h4>
            <p className="text-xs text-gray-500 mt-1">
              {isCategoriesEmpty ? 'No categories' : `${categories.length} categor${categories.length !== 1 ? 'ies' : 'y'}`}
            </p>
          </div>
        </div>
        
      
      </div>

      {/* Categories List */}
      {isCategoriesEmpty ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center shadow-sm">
            <Layers2 size={28} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-base mb-2 font-medium">No Categories Added</p>
          <p className="text-gray-400 text-xs mb-6">Add some categories to get started!</p>
          <button
            onClick={onAddCategory}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            <Plus size={16} />
            Add Your First Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <div
              key={category.id || index}
              className="group relative flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-slideInUp"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              {/* Icon/Emoji Display */}
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-lg bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-xs group-hover:shadow-sm transition-all duration-300 border border-gray-200">
                {category.icon && category.icon.startsWith('http') ? (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  />
                ) : category.icon ? (
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </span>
                ) : (
                  <Layers2 className="text-purple-600 transition-transform duration-300 group-hover:scale-110" size={18} />
                )}
              </div>

              {/* Category Name and Type */}
              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate leading-tight">
                    {category.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 capitalize flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      category.type === 'income' ? 'bg-green-500' : 
                      category.type === 'expense' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></span>
                    <span className="truncate">{category.type || 'No type specified'}</span>
                  </p>
                </div>

                {/* Actions Buttons */}
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => onEditCategory?.(category)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Add Button */}
      {!isCategoriesEmpty && (
        <div className="sm:hidden fixed bottom-6 right-6 z-10">
          <button
            onClick={onAddCategory}
            className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <Plus size={20} />
          </button>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.4s ease-out;
        }
        
        .shadow-xs {
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default CategoryList;