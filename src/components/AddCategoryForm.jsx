import { useEffect, useState } from "react";
import Input from "./Input";
import { LoaderCircle, Plus, Save } from "lucide-react";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = ({ onAddCategory, isEditing, initialCategoryData }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income", // Default to "income" instead of empty string
    icon: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      // Set default values for new category
      setCategory({ 
        name: "", 
        type: "income", // Always set a default type
        icon: "" 
      });
    }
    
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, [isEditing, initialCategoryData]);

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    // Validate form
    if (!category.name.trim() || !category.type) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="p-6">
     

        <EmojiPickerPopup
         icon={category.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <div className="space-y-6">
          <Input
            value={category.name}
            onChange={({ target }) => handleChange("name", target.value)}
            label="Category Name"
            placeholder="e.g. Salary, Groceries, Rent"
            type="text"
          />

          <Input
            label="Category Type"
            value={category.type}
            onChange={({ target }) => {
              handleChange("type", target.value);
            }}
            isSelect={true}
            options={categoryTypeOptions}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 px-6 pb-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !category.name.trim() || !category.type}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            loading || !category.name.trim() || !category.type
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl shadow-purple-200 hover:shadow-purple-300'
          }`}
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              <span>{isEditing ? "Updating..." : "Adding..."}</span>
            </>
          ) : (
            <>
              {isEditing ? (
                <>
                  <Save size={18} />
                  <span>Update Category</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Add Category</span>
                </>
              )}
            </>
          )}
        </button>
      </div>

      {/* Form Validation Message */}
      {(!category.name.trim() || !category.type) && (
        <div className="px-6 pb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 animate-pulse">
            <p className="text-yellow-700 text-sm text-center">
              ⚠️ Please fill in all required fields
            </p>
          </div>
        </div>
      )}

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
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .p-6 {
            padding: 1.25rem;
          }
          
          .px-6.pb-6 {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            padding-bottom: 1.25rem;
          }
          
          .space-y-6 > * + * {
            margin-top: 1.25rem;
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
          
          .px-6.pb-6 {
            padding-left: 1rem;
            padding-right: 1rem;
            padding-bottom: 1rem;
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

export default AddCategoryForm;