import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import Dashboard from "../components/Dashboard";
import { Search, Filter, Calendar, RotateCcw, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filters = () => {
  useUser();

  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchPerformed(true);
    try {
      // Format dates properly and handle empty values
      const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD') : null;
      const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : null;

      // Validate date range
      if (formattedStartDate && formattedEndDate && moment(formattedStartDate).isAfter(formattedEndDate)) {
        toast.error("Start date cannot be after end date");
        setLoading(false);
        return;
      }

      const response = await axiosConfig.post(API_ENDPOINTS.Filters, {
        type,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        keyword: keyword || null,
        sortField,
        sortOrder,
      });
      setTransactions(response.data);
      
      if (response.data.length === 0) {
        toast.success("No transactions found with the selected filters");
      } else {
        toast.success(`Found ${response.data.length} transactions`);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch transactions, please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setType("income");
    setStartDate("");
    setEndDate("");
    setKeyword("");
    setSortField("date");
    setSortOrder("asc");
    setTransactions([]);
    setSearchPerformed(false);
    toast.success("Filters cleared successfully");
  };

  const isFormValid = () => {
    if (startDate && endDate && moment(startDate).isAfter(endDate)) {
      return false;
    }
    return true;
  };

  const getTypeIcon = () => {
    return type === "income" ? 
      <TrendingUp size={20} className="text-green-600" /> : 
      <TrendingDown size={20} className="text-red-600" />;
  };

  const getTotalAmount = () => {
    return transactions.reduce((total, transaction) => total + (transaction.amount || 0), 0);
  };

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 shadow-sm">
              <Filter size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Filter Transactions
              </h2>
              <p className="text-gray-600 mt-1">Find your transactions with advanced filters</p>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="card p-6 mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="p-2 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 shadow-sm">
                {getTypeIcon()}
              </div>
              <div>
                <h5 className="text-lg font-semibold text-gray-800">Filter Options</h5>
                <p className="text-sm text-gray-500">Customize your transaction search</p>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:border-gray-400 transition-all duration-200 transform hover:scale-105 active:scale-95 bg-white hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Clear All
            </button>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Type Filter */}
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Transaction Type</label>
              <select
                id="type"
                value={type}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400 shadow-sm"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={14} className="text-blue-600" />
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400 shadow-sm"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={14} className="text-blue-600" />
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400 shadow-sm"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Sort Field */}
            <div className="space-y-2">
              <label htmlFor="sortField" className="block text-sm font-medium text-gray-700">Sort By</label>
              <select
                value={sortField}
                id="sortField"
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400 shadow-sm"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order</label>
              <select
                value={sortOrder}
                id="sortOrder"
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400 shadow-sm"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Search */}
            <div className="space-y-2 flex flex-col justify-end">
              <label className="block text-sm font-medium text-gray-700">Search Keyword</label>
              <div className="flex gap-2">
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                  type="text"
                  placeholder="Enter keyword..."
                  className="flex-1 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-white hover:border-gray-400 placeholder-gray-400 shadow-sm"
                />
                <button
                  onClick={handleSearch}
                  type="button"
                  disabled={loading || !isFormValid()}
                  className="mt-2 p-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search size={20} className="transition-transform duration-300 group-hover:scale-110" />
                      <span className="sr-only">Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Date Validation Error */}
          {!isFormValid() && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl animate-pulse">
              <p className="text-red-700 text-sm text-center flex items-center justify-center gap-2">
                ⚠️ Start date cannot be after end date
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {searchPerformed && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 animate-slideInUp">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${transactions.length > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'} shadow-sm`}>
                <div className={`w-3 h-3 rounded-full ${transactions.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              </div>
              <div>
                <h5 className="text-xl sm:text-2xl font-semibold text-gray-800">Transaction Results</h5>
                {transactions.length > 0 && (
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <span>Found {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</span>
                    <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      Total: ₹{getTotalAmount().toLocaleString()}
                    </span>
                  </p>
                )}
              </div>
            </div>
            
            {transactions.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <Sparkles size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  {type === 'income' ? 'Income' : 'Expense'} Results
                </span>
              </div>
            )}
          </div>
        )}

        <div className="card p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500">
          {!searchPerformed && !loading && (
            <div className="text-center py-16 animate-fadeIn">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full flex items-center justify-center border border-purple-100">
                <Filter size={32} className="text-purple-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium mb-2">Ready to Search</p>
              <p className="text-gray-400 max-w-md mx-auto">Configure your filters above and click search to find transactions</p>
            </div>
          )}

          {!loading && searchPerformed && transactions.length === 0 && (
            <div className="text-center py-16 animate-fadeIn">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-200">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium mb-2">No Transactions Found</p>
              <p className="text-gray-400 max-w-md mx-auto">Try adjusting your filters or search criteria</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Searching Transactions...</p>
              <p className="text-gray-400 text-sm mt-1">Please wait while we fetch your data</p>
            </div>
          )}

          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="transform transition-all duration-500 hover:scale-[1.02] animate-slideInUp"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <TransactionInfoCard
                  title={transaction.name}
                  icon={transaction.icon}
                  date={moment(transaction.date).format("Do MMM YYYY")}
                  amount={transaction.amount}
                  type={transaction.type}
                  hideDeleteBtn
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-6 {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .flex.items-center.gap-2 {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </Dashboard>
  );
};

export default Filters;