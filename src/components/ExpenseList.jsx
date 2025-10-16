import React, { useState } from "react";
import { Download, Mail, TrendingDown, FileText, Send } from "lucide-react";
import moment from "moment";
import TransactionInfoCardE from "./TransactionInfoCardE";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState({
    email: false,
    download: false,
  });

  const handleEmail = async () => {
    setLoading((l) => ({ ...l, email: true }));
    try {
      await onEmail();
    } finally {
      setLoading((l) => ({ ...l, email: false }));
    }
  };

  const handleDownload = async () => {
    setLoading((l) => ({ ...l, download: true }));
    try {
      await onDownload();
    } finally {
      setLoading((l) => ({ ...l, download: false }));
    }
  };

  return (
    <div className="card bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
            <TrendingDown size={20} className="text-red-600" />
          </div>
          <div>
            <h5 className="text-xl font-semibold text-gray-800">Expenses</h5>
            <p className="text-sm text-gray-500 mt-1">
              {transactions?.length || 0} expense{transactions?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            disabled={loading.email}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              loading.email 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200'
            }`}
            onClick={handleEmail}
          >
            {loading.email ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
            <span>{loading.email ? "Sending..." : "Email"}</span>
          </button>
          
          <button
            disabled={loading.download}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              loading.download 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200'
            }`}
            onClick={handleDownload}
          >
            {loading.download ? (
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download size={16} />
            )}
            <span>{loading.download ? "Downloading..." : "Download"}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        {(!transactions || transactions.length === 0) ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <FileText size={28} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No Expenses Found</p>
            <p className="text-gray-400 text-sm">Expense transactions will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {transactions.map((expense, index) => (
              <div
                key={expense.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.5s ease-out forwards'
                }}
              >
                <TransactionInfoCardE
                  title={expense.name}
                  icon={expense.icon}
                  date={moment(expense.date).format("Do MMM YYYY")}
                  amount={expense.amount}
                  type="expense"
                  onDelete={() => onDelete(expense.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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
          
          .flex.items-center.gap-3 {
            gap: 0.75rem;
          }
          
          .px-4.py-2.5 {
            padding-left: 0.875rem;
            padding-right: 0.875rem;
            padding-top: 0.625rem;
            padding-bottom: 0.625rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 480px) {
          .flex-col.gap-4 {
            gap: 1rem;
          }
          
          .p-6 {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ExpenseList;