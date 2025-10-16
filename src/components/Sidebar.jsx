import React, { useContext } from "react";
import { AppContext } from "../context1/AppContext";
import { useNavigate } from "react-router-dom";
import { User, ChevronRight } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";

const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200 p-6 sticky top-[61px] z-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* User Profile Section */}
        <div className="flex flex-col items-center justify-center gap-4 mt-4 mb-8 p-4 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100">
          <div className="relative">
            {user?.profileImageUrl ? (
              <img
                src={user?.profileImageUrl}
                alt="profile"
                className="w-20 h-20 bg-slate-400 rounded-full object-cover border-2 border-white shadow-md hover:shadow-lg transition-all duration-300"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:shadow-lg transition-all duration-300">
                <User className="w-10 h-10 text-gray-500" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <h5 className="text-gray-900 font-semibold text-lg leading-6 truncate max-w-full text-center">
            {user?.fullName || "Welcome User"}
          </h5>
          <p className="text-gray-500 text-sm text-center">Manage your finances</p>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-2">
          {SIDE_BAR_DATA.map((item, index) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer w-full flex items-center justify-between text-[15px] py-4 px-5 rounded-xl mb-1 transition-all duration-300 transform hover:scale-[1.02] group ${
                activeMenu === item.label
                  ? "text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-200"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-700 border border-transparent hover:border-purple-100"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInLeft 0.5s ease-out forwards'
              }}
            >
              <div className="flex items-center gap-3">
                {/* Safe check for icon */}
                {item.icon && React.createElement(item.icon, { 
                  className: `text-xl transition-all duration-300 ${
                    activeMenu === item.label 
                      ? "text-white" 
                      : "text-gray-500 group-hover:text-purple-600"
                  }` 
                })}
                <span className="font-medium">{item.label}</span>
              </div>
              
              <ChevronRight 
                size={16} 
                className={`transition-all duration-300 ${
                  activeMenu === item.label 
                    ? "text-white opacity-100" 
                    : "text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                }`} 
              />
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💰 Track your expenses wisely
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
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
          .w-64 {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;