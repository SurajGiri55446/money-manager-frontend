import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import TransactionInfoCard from './TransactionInfoCard';

const ReactTransaction = ({ transactions, onMore }) => {
  const getTransactionCount = () => {
    const count = transactions?.length || 0;
    if (count === 0) return 'No recent transactions';
    if (count === 1) return '1 transaction';
    return `${count} transactions`;
  };

  return (
    <div className="card bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Clock size={20} className="text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Recent Transactions</h4>
            <p className="text-sm text-gray-500 mt-1">{getTransactionCount()}</p>
          </div>
        </div>
        
        <button 
          className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200 group"
          onClick={onMore}
        >
          <span className="text-sm font-medium">View All</span>
          <ArrowRight 
            size={16} 
            className="transition-transform duration-200 group-hover:translate-x-1" 
          />
        </button>
      </div>

      {/* Transactions List */}
      <div className="p-6 pt-2">
        {transactions?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <TrendingUp size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No transactions yet</p>
            <p className="text-gray-400 text-xs mt-1">Your recent transactions will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions?.slice(0, 5)?.map((item, index) => (
              <div
                key={item.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.5s ease-out forwards'
                }}
              >
                <TransactionInfoCard
                  title={item.name}
                  icon={item.icon}
                  date={moment(item.date).format("Do MMM YYYY")}
                  amount={item.amount}
                  type={item.type}
                  hideDeleteBtn
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Footer for Mobile */}
      {transactions?.length > 5 && (
        <div className="px-6 pb-4 sm:hidden">
          <button 
            className="w-full py-2 text-center text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors duration-200 border border-gray-200"
            onClick={onMore}
          >
            View All {transactions.length} Transactions
          </button>
        </div>
      )}

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
      `}</style>
    </div>
  );
};

export default ReactTransaction;