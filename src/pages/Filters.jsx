import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import Dashboard from "../components/Dashboard";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.Filters, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder,
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      toast.error(error.message || "Failed to fetch transactions, please try again.");
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
  };

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Filter Transactions</h2>
            <p className="text-gray-600 mt-1">Find your transactions with advanced filters</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors duration-200"
          >
            <Filter size={18} />
            {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            <span className="font-medium">{showFilters ? "Hide" : "Show"} Filters</span>
          </button>
        </div>

        {/* Filters Card */}
        <div className={`card p-6 mb-6 transition-all duration-300 ${showFilters ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h5 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Filter Options</h5>
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:border-gray-400 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                value={type}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="sortField" className="block text-sm font-medium text-gray-700">Sort Field</label>
              <select
                value={sortField}
                id="sortField"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setSortField(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order</label>
              <select
                value={sortOrder}
                id="sortOrder"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="space-y-2 flex flex-col justify-end">
              <label className="block text-sm font-medium text-gray-700">Search Keyword</label>
              <div className="flex gap-2">
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                  type="text"
                  placeholder="Enter keyword..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={handleSearch}
                  type="button"
                  className="p-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h5 className="text-xl sm:text-2xl font-semibold text-gray-800">Transaction Results</h5>
            {transactions.length > 0 && (
              <p className="text-gray-600 mt-1">
                Found {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          {!loading && transactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No transactions found</p>
              <p className="text-gray-400">Select filters and click search to see transactions</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading transactions...</p>
            </div>
          )}

          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                <TransactionInfoCard
                  title={transaction.name}
                  icon={transaction.icon}
                  date={moment(transaction.date).format("Do MMM YYYY")}
                  type={transaction.type}
                  hideDeleteBtn
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
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
      `}</style>
    </Dashboard>
  );
};

export default Filters;