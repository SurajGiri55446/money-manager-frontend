// TransactionInfoCard.jsx
import React from "react";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { addThousandsSeparator } from "../Util/addThousandsSeparator";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-50 text-green-800 border border-green-200"
      : "bg-red-50 text-red-500 border border-red-200";

  const getTrendingIcon = () =>
    type === "income" ? (
      <TrendingUp size={14} className="text-green-600" />
    ) : (
      <TrendingDown size={14} className="text-red-500" />
    );

  return (
    <div className="group relative flex items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl bg-gray-50 rounded-xl shadow-sm group-hover:shadow transition-all duration-300">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-600 font-medium">$</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <span>📅</span>
          {date}
        </p>
      </div>

      {/* Amount & Actions */}
      <div className="flex items-center gap-3">
        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
          >
            <Trash2 size={16} />
          </button>
        )}
        
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getAmountStyles()} transition-all duration-300 group-hover:shadow-sm`}
        >
          <h6 className="text-sm font-semibold whitespace-nowrap">
            {type === "income" ? "+" : "-"} {addThousandsSeparator(amount)}
          </h6>
          {getTrendingIcon()}
        </div>
      </div>

      {/* Mobile responsive adjustments */}
      <style jsx>{`
        @media (max-width: 640px) {
          .group {
            gap: 0.75rem;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionInfoCard;