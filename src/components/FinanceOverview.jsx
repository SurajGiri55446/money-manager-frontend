import React, { useState, useEffect } from 'react';
import { addThousandsSeparator } from '../Util/addThousandsSeparator';
import CustomPieChart from './CustomPieChart';
import { TrendingUp, DollarSign, PieChart } from 'lucide-react';

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [animatedIncome, setAnimatedIncome] = useState(0);
  const [animatedExpense, setAnimatedExpense] = useState(0);

  const COLORS = ["#591688", "#d0090e", "#016630"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Animate numbers counting up
    const animateValue = (setter, target, duration = 1500) => {
      
      const steps = 60;
      const increment = target / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setter(Math.min(Math.floor(increment * currentStep), target));
        
        if (currentStep >= steps) {
          setter(target);
          clearInterval(timer);
        }
      }, duration / steps);
    };

    animateValue(setAnimatedBalance, totalBalance);
    animateValue(setAnimatedIncome, totalIncome);
    animateValue(setAnimatedExpense, totalExpense);
  }, [totalBalance, totalIncome, totalExpense]);

  return (
    <div className={`card bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <PieChart size={20} className="text-purple-600" />
          </div>
          <div>
            <h5 className="text-xl font-semibold text-gray-800">Financial Overview</h5>
            <p className="text-sm text-gray-500 mt-1">Complete financial snapshot</p>
          </div>
        </div>
      </div>

      {/* Chart and Stats */}
      <div className="p-6 pt-2">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Pie Chart */}
          <div className="flex-1 w-full max-w-xs mx-auto">
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={addThousandsSeparator(totalBalance)}
                colors={COLORS}
                showTextAnchor
              />
            </div>
          </div>

          {/* Financial Stats */}
          <div className="flex-1 space-y-4 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
              {/* Total Balance */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <DollarSign size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-purple-700">Total Balance</p>
                    <p className="text-lg font-bold text-gray-800 truncate">
                      ₹{addThousandsSeparator(animatedBalance)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Income */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 border border-green-200 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <TrendingUp size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-700">Total Income</p>
                    <p className="text-lg font-bold text-gray-800 truncate">
                      ₹{addThousandsSeparator(animatedIncome)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Expense */}
              <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-4 border border-red-200 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <TrendingUp size={16} className="text-red-600 rotate-180" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-700">Total Expense</p>
                    <p className="text-lg font-bold text-gray-800 truncate">
                      ₹{addThousandsSeparator(animatedExpense)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {totalBalance === 0 && totalIncome === 0 && totalExpense === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <PieChart size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No financial data available</p>
            <p className="text-gray-400 text-xs mt-1">Add transactions to see your financial overview</p>
          </div>
        )}
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .flex-col.lg\\:flex-row {
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 640px) {
          .p-6 {
            padding: 1.25rem;
          }
          
          .text-xl {
            font-size: 1.25rem;
          }
          
          .grid-cols-3 {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          
          .max-w-xs {
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default FinanceOverview;