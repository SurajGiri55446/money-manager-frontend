// DeleteAlert.jsx
import React, { useState } from "react";
import { LoaderCircle, AlertTriangle, Trash2 } from "lucide-react";

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 animate-scaleIn">
      {/* Warning Icon and Message */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={24} className="text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Confirm Deletion</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <button
          onClick={handleDelete}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            loading
              ? 'bg-red-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl shadow-red-200 hover:shadow-red-300'
          } text-white`}
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            <>
              <Trash2 size={18} />
              <span>Delete</span>
            </>
          )}
        </button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .p-6 {
            padding: 1.25rem;
          }
          
          .flex.items-center.gap-4 {
            gap: 1rem;
          }
          
          .w-12.h-12 {
            width: 3rem;
            height: 3rem;
          }
          
          .px-6.py-3 {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            padding-top: 0.875rem;
            padding-bottom: 0.875rem;
          }
        }
        
        @media (max-width: 480px) {
          .p-6 {
            padding: 1rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteAlert;