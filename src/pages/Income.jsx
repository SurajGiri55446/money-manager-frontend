// Income.jsx (page / container)
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import { Modal } from "rsuite";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if (response.status === 200) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch income details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income details."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error(
        "Failed to fetch income categories:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to fetch income categories."
      );
    }
  };

  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.error("Error adding income", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_INCOME(id)
      );
      console.log("Deleted income:", response.data);

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        {
          responseType: "blob",
        }
      );
      const filename = "income_details.xlsx";
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
      toast.success("Downloaded income details successfully");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error(error.response?.data?.message || "Failed to download income");
    }
  };

  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if (response.status === 200) {
        toast.success("Income details emailed successfully");
      }
    } catch (error) {
      console.error("Error emailing income details", error);
      toast.error(error.response?.data?.message || "Failed to email income");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />

          <Modal
            open={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            backdrop="static"
          >
            <Modal.Header>
              <Modal.Title>Add Income</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddIncomeForm
                onAddIncome={(income) => handleAddIncome(income)}
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
              <Modal.Title>Delete Income</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DeleteAlert
                content="Are you sure you want to delete this income record?"
                onDelete={() => deleteIncome(openDeleteAlert.data)}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
