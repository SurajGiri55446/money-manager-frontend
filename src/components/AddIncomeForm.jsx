// AddIncomeForm.jsx
import React, { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { Input } from "rsuite";
import { LoaderCircle, Plus, Calendar, DollarSign, Folder } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setIncome((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
    
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, [categories]);

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setIncome((prev) => ({ ...prev, date: today }));
  }, []);

  return (
    <div className={`p-6 space-y-6 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <div className="space-y-6">
        {/* Income Source */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <DollarSign size={16} className="text-green-600" />
            Income Source
          </label>
          <Input
            value={income.name}
            onChange={(value) => handleChange("name", value)}
            placeholder="e.g. Salary, Freelance, Bonus"
            type="text"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Folder size={16} className="text-purple-600" />
            Category
          </label>
          <select
            value={income.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white appearance-none cursor-pointer"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <DollarSign size={16} className="text-green-600" />
            Amount
          </label>
          <Input
            value={income.amount}
            onChange={(value) => handleChange("amount", value)}
            placeholder="0.00"
            type="number"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar size={16} className="text-blue-600" />
            Date
          </label>
          <input
            value={income.date}
            onChange={(e) => handleChange("date", e.target.value)}
            type="date"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={loading || !income.name || !income.amount || !income.date}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            loading || !income.name || !income.amount || !income.date
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl shadow-green-200 hover:shadow-green-300'
          }`}
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              <span>Adding Income...</span>
            </>
          ) : (
            <>
              <Plus size={18} />
              <span>Add Income</span>
            </>
          )}
        </button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom select arrow */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.75rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }
        
        /* Remove default arrow for IE */
        select::-ms-expand {
          display: none;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .p-6 {
            padding: 1.25rem;
          }
          
          .space-y-6 > * + * {
            margin-top: 1.25rem;
          }
          
          .px-4.py-3 {
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 0.875rem;
            padding-bottom: 0.875rem;
          }
          
          .px-6.py-3 {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            padding-top: 0.875rem;
            padding-bottom: 0.875rem;
          }
        }
        
        @media (max-width: 480px) {
          .p-6 {
            padding: 1rem;
          }
          
          .flex.justify-end {
            justify-content: center;
          }
          
          button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AddIncomeForm;