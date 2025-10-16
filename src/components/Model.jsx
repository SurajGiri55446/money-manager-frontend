import { X } from "lucide-react";

const Model = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) {
    return null;
  }
  
  return (
    <div>
      <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm animate-fadeIn">
        <div className="relative p-4 w-full max-w-2xl max-h-[90vh] animate-scaleIn">
          {/* modal content */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-300">
            {/* modal header */}
            <div className="flex items-center justify-between p-6 md:p-7 border-b border-gray-100 rounded-t-2xl bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 rounded-xl text-sm w-10 h-10 flex justify-center items-center transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-offset-2 border border-gray-200 hover:border-gray-300 hover:scale-105 active:scale-95"
              >
                <X className="h-4 w-4" size={16} />
              </button>
            </div>
            {/* modal body */}
            <div className="p-6 md:p-7 text-gray-700 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
          margin: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .relative.p-4 {
            padding: 1rem;
            max-width: 95%;
          }
          
          .p-6.md\\:p-7 {
            padding: 1rem;
          }
          
          .max-h-\\[60vh\\] {
            max-height: 50vh;
          }
        }
        
        @media (max-width: 480px) {
          .relative.p-4 {
            padding: 0.5rem;
            max-width: 98%;
          }
          
          .p-6.md\\:p-7 {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Model;