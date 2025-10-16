import React, { useEffect, useState } from "react";
import { Plus, TrendingDown, Calendar, AlertCircle } from "lucide-react";
import CustomLineChart from "./CustomLineChart";
import { prepareIncomeLineChartData } from "../Util/prepareIncomeLineChartData";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
    
    // Trigger animation after data is loaded
    setTimeout(() => setIsVisible(true), 100);
  }, [transactions]);

  return (
    <div className={`card bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
            <TrendingDown size={20} className="text-red-600" />
          </div>
          <div>
            <h5 className="text-xl font-semibold text-gray-800">Expense Overview</h5>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <Calendar size={14} />
              Track your spending trends over time
            </p>
          </div>
        </div>
        
        <button
          className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl shadow-red-200 hover:shadow-red-300"
          onClick={onAddExpense}
        >
          <Plus size={18} className="transition-transform duration-300 group-hover:rotate-90" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Chart Section */}
      <div className="p-6 pt-2">
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <CustomLineChart data={chartData} />
        </div>
        
        {/* Empty State */}
        {chartData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <AlertCircle size={28} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg mb-2">No Expense Data</p>
            <p className="text-gray-400 text-sm">Add expense transactions to see your spending overview</p>
            <button
              className="mt-4 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-all duration-300 mx-auto transform hover:scale-105"
              onClick={onAddExpense}
            >
              <Plus size={16} />
              Add Your First Expense
            </button>
          </div>
        )}
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 640px) {
          .p-6 {
            padding: 1.25rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
          }
          
          .py-3.px-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            padding-left: 1rem;
            padding-right: 1rem;
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

export default ExpenseOverview;