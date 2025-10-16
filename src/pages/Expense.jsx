import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import { Modal } from "rsuite";
import DeleteAlert from "../components/DeleteAlert";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseOverview from "../components/ExpenseOverview";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if (response.status === 200) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch expense details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch expense details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error(
        "Failed to fetch expense categories:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to fetch expense categories."
      );
    }
  };

  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;

    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate > today) {
      toast.error("Date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.error("Error adding expense", error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_EXPENSE(id)
      );
      console.log("Deleted expense:", response.data);

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense", error);
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        {
          responseType: "blob",
        }
      );
      const filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);
      toast.success("Downloaded expense details successfully");
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error(error.response?.data?.message || "Failed to download expense");
    }
  };

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Expense details emailed successfully");
      }
    } catch (error) {
      console.error("Error emailing expense details", error);
      toast.error(error.response?.data?.message || "Failed to email expense");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* ✅ FIXED: Use onAddExpense here */}
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          {/* Add Expense Modal */}
          <Modal
            open={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            backdrop="static"
          >
            <Modal.Header>
              <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddExpenseForm
                onAddExpense={(expense) => handleAddExpense(expense)}
                categories={categories}
              />
            </Modal.Body>
          </Modal>

          {/* Delete Confirmation */}
          <Modal
            open={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            backdrop="static"
          >
            <Modal.Header>
              <Modal.Title>Delete Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DeleteAlert
                content="Are you sure you want to delete this expense record?"
                onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
