import React, { useEffect, useState } from "react";
import { Input } from "rsuite";
import { LoaderCircle, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
    icon: category.icon, // Assuming categories have icon property
  }));

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const handleEmojiClick = (emojiData) => {
    handleChange("icon", emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async () => {
    if (!expense.name.trim() || !expense.amount || !expense.date || !expense.categoryId) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await onAddExpense(expense);
      // Reset form after successful submission
      setExpense({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: categories[0]?.id || "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories]);

  const isFormValid = expense.name.trim() && expense.amount && expense.date && expense.categoryId;

  return (
    <div className="p-4 space-y-4">
      {/* Icon Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Expense Icon
        </label>
        <div className="relative">
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 transition-all duration-200 cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <div className="flex items-center gap-3">
              {expense.icon ? (
                <>
                  <span className="text-2xl">{expense.icon}</span>
                  <span className="text-sm text-gray-600">Selected icon</span>
                </>
              ) : (
                <span className="text-gray-400 text-sm">Click to select an emoji</span>
              )}
            </div>
            <Smile className="w-4 h-4 text-gray-400" />
          </div>
          
          {showEmojiPicker && (
            <div className="absolute top-full left-0 z-10 mt-2 shadow-lg rounded-lg overflow-hidden">
              <EmojiPicker 
                onEmojiClick={handleEmojiClick}
                searchDisabled={false}
                skinTonesDisabled={true}
                height={350}
                width={280}
              />
            </div>
          )}
        </div>
      </div>

      {/* Expense Name */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Expense Name *
        </label>
        <Input
          value={expense.name}
          onChange={(value) => handleChange("name", value)}
          placeholder="e.g. Rent, Groceries, Travel"
          type="text"
          className="w-full"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Category *
        </label>
        <select
          value={expense.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Amount *
        </label>
        <Input
          value={expense.amount}
          onChange={(value) => handleChange("amount", value)}
          placeholder="e.g. 200"
          type="number"
          className="w-full"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Date *
        </label>
        <input
          value={expense.date}
          onChange={(e) => handleChange("date", e.target.value)}
          type="date"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Form Validation */}
      {!isFormValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-700 text-sm text-center">
            Please fill in all required fields (marked with *)
          </p>
        </div>
      )}

      {/* Preview */}
      {(expense.name || expense.icon) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div className="flex items-center gap-3">
            {expense.icon && (
              <span className="text-xl bg-white p-2 rounded-lg shadow-sm">
                {expense.icon}
              </span>
            )}
            <div>
              <p className="font-medium text-gray-800">
                {expense.name || "Unnamed Expense"}
              </p>
              <p className="text-sm text-gray-600">
                Amount: {expense.amount ? `$${expense.amount}` : "Not set"}
              </p>
              <p className="text-sm text-gray-600">
                Category: {categoryOptions.find(cat => cat.value === expense.categoryId)?.label || "Not selected"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading || !isFormValid}
          className={`
            px-6 py-3 rounded-lg font-semibold
            flex items-center justify-center gap-2
            transition-all duration-200
            ${
              loading || !isFormValid
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }
          `}
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Expense"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;