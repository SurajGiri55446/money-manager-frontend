import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again later", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }

    const isDuplicate = categoryData.some(
      (cat) => cat.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Category name already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name,
        type,
        icon,
      });
      if (response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModel(false);
        await fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category", error);
      toast.error(error.response?.data?.message || "Failed to add category!");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModel(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;
    if (!name.trim()) {
      toast.error("Category Name is required.");
      return;
    }

    if (!id) {
      toast.error("Category ID is required for update.");
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon,
      });

      setOpenEditCategoryModel(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully.");
      fetchCategoryDetails();
    } catch (error) {
      console.error("Error updating category", error);
      toast.error(error.response?.data?.message || "Failed to update category.");
    }
  };

  return (
    <>
      {/* MODALS - SABSE BAHAR, DIRECT ROOT LEVEL PE */}
      <Model
        isOpen={openAddCategoryModel}
        onClose={() => setOpenAddCategoryModel(false)}
        title="Add New Category"
      >
        <AddCategoryForm 
          onAddCategory={handleAddCategory}
          onCancel={() => setOpenAddCategoryModel(false)}
        />
      </Model>

      <Model
        isOpen={openEditCategoryModel}
        onClose={() => {
          setOpenEditCategoryModel(false);
          setSelectedCategory(null);
        }}
        title="Update Category"
      >
        <AddCategoryForm
          initialCategoryData={selectedCategory}
          onAddCategory={handleUpdateCategory}
          isEditing={true}
          onCancel={() => {
            setOpenEditCategoryModel(false);
            setSelectedCategory(null);
          }}
        />
      </Model>

      {/* DASHBOARD - ALAG SE */}
      <Dashboard activeMenu="Category">
        <div className="my-5 mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Categories</h2>
              <p className="text-gray-600 mt-2">
                Manage your income and expense categories
              </p>
            </div>
            
            {/* Add Category Button */}
            <button
              onClick={() => {
                setSelectedCategory(null);
                setOpenAddCategoryModel(true);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              <Plus size={18} />
              Add Category
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          )}

          {/* Category List */}
          {!loading && (
            <CategoryList
              categories={categoryData}
              onEditCategory={handleEditCategory}
              onAddCategory={() => setOpenAddCategoryModel(true)}
            />
          )}
        </div>
      </Dashboard>
    </>
  );
};

export default Category;